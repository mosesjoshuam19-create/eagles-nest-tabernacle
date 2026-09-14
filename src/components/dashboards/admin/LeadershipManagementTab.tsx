import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Leader = {
  id: string;
  name: string;
  position: string;
  category: string;
  description: string | null;
  biography: string;
  responsibility: string | null;
  image_url: string | null;
  sort_order: number;
  is_published: boolean;
};

const emptyForm = {
  name: "",
  position: "",
  category: "ministers",
  description: "",
  biography: "",
  responsibility: "",
  image_url: "",
  sort_order: 0,
  is_published: true,
};

const LeadershipManagementTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const loadLeaders = async () => {
    const { data, error } = await supabase.from("leaders").select("*").order("sort_order").order("name");
    if (error) throw error;
    setLeaders((data || []) as Leader[]);
  };

  useEffect(() => {
    loadLeaders().catch((error) => {
      console.error("Error loading leaders:", error);
      toast({ title: "Unable to load leaders", description: error.message, variant: "destructive" });
    });
  }, [toast]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setSelectedFile(null);
  };

  const saveLeader = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !form.name.trim() || !form.position.trim() || !form.biography.trim()) return;
    setSaving(true);

    let imageUrl = form.image_url.trim() || null;
    if (selectedFile) {
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
      if (!allowedTypes.has(selectedFile.type) || selectedFile.size > 10 * 1024 * 1024) {
        setSaving(false);
        toast({ title: "Unsupported profile photo", description: "Use a JPG, PNG, WEBP, or GIF up to 10 MB.", variant: "destructive" });
        return;
      }
      const safeName = selectedFile.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
      const upload = await supabase.storage.from("media").upload(`leaders/${user.id}/${Date.now()}-${safeName}`, selectedFile, { upsert: false });
      if (upload.error) {
        setSaving(false);
        toast({ title: "Photo upload failed", description: upload.error.message, variant: "destructive" });
        return;
      }
      imageUrl = supabase.storage.from("media").getPublicUrl(upload.data.path).data.publicUrl;
    }

    const payload = {
      name: form.name.trim(),
      position: form.position.trim(),
      category: form.category,
      description: form.description.trim() || null,
      biography: form.biography.trim(),
      responsibility: form.responsibility.trim() || null,
      image_url: imageUrl,
      sort_order: Number(form.sort_order) || 0,
      is_published: form.is_published,
      created_by: user.id,
    };
    const result = editingId
      ? await supabase.from("leaders").update(payload).eq("id", editingId)
      : await supabase.from("leaders").insert(payload);

    setSaving(false);
    if (result.error) {
      toast({ title: "Leader not saved", description: result.error.message, variant: "destructive" });
      return;
    }
    resetForm();
    await loadLeaders();
    toast({ title: editingId ? "Leader updated" : "Leader added" });
  };

  const deleteLeader = async (id: string) => {
    if (!window.confirm("Delete this leadership profile? This action cannot be undone.")) return;
    const { error } = await supabase.from("leaders").delete().eq("id", id);
    if (error) {
      toast({ title: "Leader not deleted", description: error.message, variant: "destructive" });
      return;
    }
    setLeaders((current) => current.filter((leader) => leader.id !== id));
    toast({ title: "Leader deleted" });
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="space-y-6 pt-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Leadership profiles</h2>
          <p className="text-sm text-slate-500">Manage names, roles, biographies, ordering, and profile photos.</p>
        </div>
        <form onSubmit={saveLeader} className="grid gap-3 rounded-lg border bg-slate-50 p-4 md:grid-cols-2">
          <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
          <select className="h-10 rounded-md border bg-white px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="pastor">Pastor</option>
            <option value="ministers">Ministers</option>
            <option value="deacons">Deacons</option>
            <option value="trustees">Trustees</option>
          </select>
          <Input type="number" min="0" placeholder="Display order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          <Input placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Responsibility / church location" value={form.responsibility} onChange={(e) => setForm({ ...form, responsibility: e.target.value })} />
          <Textarea className="md:col-span-2" placeholder="Biography" value={form.biography} onChange={(e) => setForm({ ...form, biography: e.target.value })} required />
          <Input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
          <Input placeholder="Or paste a public profile photo URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}><Upload className="mr-2 h-4 w-4" />{editingId ? "Update profile" : "Add profile"}</Button>
            {editingId && <Button type="button" variant="outline" onClick={resetForm}><X className="mr-2 h-4 w-4" />Cancel</Button>}
          </div>
        </form>
        <div className="grid gap-3 md:grid-cols-2">
          {leaders.map((leader) => (
            <div key={leader.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
              <div className="flex min-w-0 items-center gap-3">
                {leader.image_url ? <img src={leader.image_url} alt="" className="h-12 w-12 rounded-full object-cover" /> : <div className="h-12 w-12 rounded-full bg-slate-200" />}
                <div className="min-w-0"><p className="truncate font-semibold">{leader.name}</p><p className="text-xs text-slate-500">{leader.position} · {leader.category}</p></div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditingId(leader.id); setForm({ name: leader.name, position: leader.position, category: leader.category, description: leader.description || "", biography: leader.biography, responsibility: leader.responsibility || "", image_url: leader.image_url || "", sort_order: leader.sort_order, is_published: leader.is_published }); }}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => deleteLeader(leader.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
          {leaders.length === 0 && <p className="py-8 text-center text-sm text-slate-500 md:col-span-2">No leadership profiles yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadershipManagementTab;
