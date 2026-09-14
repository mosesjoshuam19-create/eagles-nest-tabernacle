import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContentRecord = {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  sort_order: number;
  is_published: boolean;
};

const emptyForm = {
  page_key: "mission",
  section_key: "",
  title: "",
  subtitle: "",
  body: "",
  image_url: "",
  link_url: "",
  sort_order: 0,
  is_published: true,
};

const SiteContentManagementTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [records, setRecords] = useState<ContentRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadContent = async () => {
    const { data, error } = await supabase.from("site_content").select("*").order("page_key").order("sort_order");
    if (error) throw error;
    setRecords((data || []) as ContentRecord[]);
  };

  useEffect(() => {
    loadContent().catch((error) => {
      console.error("Error loading site content:", error);
      toast({ title: "Unable to load site content", description: error.message, variant: "destructive" });
    });
  }, [toast]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveContent = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !form.page_key.trim() || !form.section_key.trim() || !form.title.trim()) return;
    setSaving(true);
    const payload = {
      page_key: form.page_key.trim().toLowerCase(),
      section_key: form.section_key.trim().toLowerCase(),
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      body: form.body.trim() || null,
      image_url: form.image_url.trim() || null,
      link_url: form.link_url.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      is_published: form.is_published,
      created_by: user.id,
    };
    const result = editingId
      ? await supabase.from("site_content").update(payload).eq("id", editingId)
      : await supabase.from("site_content").insert(payload);
    setSaving(false);
    if (result.error) {
      toast({ title: "Content not saved", description: result.error.message, variant: "destructive" });
      return;
    }
    resetForm();
    await loadContent();
    toast({ title: editingId ? "Content updated" : "Content added" });
  };

  const deleteContent = async (id: string) => {
    if (!window.confirm("Delete this content section? This action cannot be undone.")) return;
    const { error } = await supabase.from("site_content").delete().eq("id", id);
    if (error) {
      toast({ title: "Content not deleted", description: error.message, variant: "destructive" });
      return;
    }
    setRecords((current) => current.filter((record) => record.id !== id));
    toast({ title: "Content deleted" });
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="space-y-6 pt-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Site content</h2>
          <p className="text-sm text-slate-500">Manage reusable page sections without changing code. Use a page key such as mission, history, contact, or home.</p>
        </div>
        <form onSubmit={saveContent} className="grid gap-3 rounded-lg border bg-slate-50 p-4 md:grid-cols-2">
          <Input placeholder="Page key (e.g. mission)" value={form.page_key} onChange={(e) => setForm({ ...form, page_key: e.target.value })} required />
          <Input placeholder="Section key (e.g. header)" value={form.section_key} onChange={(e) => setForm({ ...form, section_key: e.target.value })} required />
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <Textarea className="md:col-span-2" placeholder="Body content" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          <Input placeholder="Image URL (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <Input placeholder="Link URL (optional)" value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} />
          <Input type="number" min="0" placeholder="Display order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}><Plus className="mr-2 h-4 w-4" />{editingId ? "Update section" : "Add section"}</Button>
            {editingId && <Button type="button" variant="outline" onClick={resetForm}><X className="mr-2 h-4 w-4" />Cancel</Button>}
          </div>
        </form>
        <div className="space-y-2">
          {records.map((record) => (
            <div key={record.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0"><p className="font-semibold">{record.title}</p><p className="text-xs uppercase text-slate-500">{record.page_key} / {record.section_key}</p>{record.body && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{record.body}</p>}</div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditingId(record.id); setForm({ page_key: record.page_key, section_key: record.section_key, title: record.title, subtitle: record.subtitle || "", body: record.body || "", image_url: record.image_url || "", link_url: record.link_url || "", sort_order: record.sort_order, is_published: record.is_published }); }}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => deleteContent(record.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
          {records.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No site content sections yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteContentManagementTab;
