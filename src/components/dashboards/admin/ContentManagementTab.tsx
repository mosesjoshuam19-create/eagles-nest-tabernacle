import { useEffect, useState } from "react";
import { Calendar, Image, Megaphone, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadershipManagementTab from "./LeadershipManagementTab";

type EventRecord = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: string | null;
  location: string | null;
  is_published: boolean | null;
};

type MediaRecord = {
  id: string;
  title: string;
  description: string | null;
  media_type: string;
  file_url: string | null;
  thumbnail_url: string | null;
  is_published: boolean | null;
};

type AnnouncementRecord = {
  id: string;
  title: string;
  content: string;
  publish_date: string | null;
  is_published: boolean | null;
};

const emptyEvent = {
  title: "",
  description: "",
  event_date: "",
  event_type: "church",
  location: "",
  is_published: true,
};

const emptyAnnouncement = {
  title: "",
  content: "",
  publish_date: "",
  is_published: true,
};

const ContentManagementTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [announcementForm, setAnnouncementForm] = useState(emptyAnnouncement);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [mediaForm, setMediaForm] = useState({
    title: "",
    description: "",
    media_type: "picture",
    file_url: "",
    thumbnail_url: "",
    is_published: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadContent = async () => {
    const [eventsResult, mediaResult, announcementsResult] = await Promise.all([
      supabase.from("events").select("*").order("event_date", { ascending: true }),
      supabase.from("media_content").select("*").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);

    if (eventsResult.error || mediaResult.error || announcementsResult.error) {
      throw eventsResult.error || mediaResult.error || announcementsResult.error;
    }

    setEvents((eventsResult.data || []) as EventRecord[]);
    setMedia((mediaResult.data || []) as MediaRecord[]);
    setAnnouncements((announcementsResult.data || []) as AnnouncementRecord[]);
  };

  useEffect(() => {
    loadContent().catch((error) => {
      console.error("Error loading content management data:", error);
      toast({
        title: "Unable to load content",
        description: "Check your connection and Supabase permissions.",
        variant: "destructive",
      });
    });
  }, [toast]);

  const saveEvent = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !eventForm.title.trim() || !eventForm.event_date) return;
    setSaving(true);

    const payload = {
      ...eventForm,
      title: eventForm.title.trim(),
      created_by: user.id,
    };
    const result = editingEventId
      ? await supabase.from("events").update(payload).eq("id", editingEventId)
      : await supabase.from("events").insert(payload);

    setSaving(false);
    if (result.error) {
      toast({ title: "Event not saved", description: result.error.message, variant: "destructive" });
      return;
    }

    setEventForm(emptyEvent);
    setEditingEventId(null);
    await loadContent();
    toast({ title: editingEventId ? "Event updated" : "Event published" });
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm("Delete this event? This action cannot be undone.")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({ title: "Event not deleted", description: error.message, variant: "destructive" });
      return;
    }
    setEvents((current) => current.filter((event) => event.id !== id));
    toast({ title: "Event deleted" });
  };

  const saveMedia = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !mediaForm.title.trim()) return;
    setSaving(true);

    let fileUrl = mediaForm.file_url.trim() || null;
    if (selectedFile) {
      const allowedTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "video/mp4",
        "video/webm",
      ]);
      if (!allowedTypes.has(selectedFile.type) || selectedFile.size > 50 * 1024 * 1024) {
        setSaving(false);
        toast({
          title: "Unsupported file",
          description: "Use an approved image/video file up to 50 MB.",
          variant: "destructive",
        });
        return;
      }
      const safeName = selectedFile.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
      const path = `${user.id}/${Date.now()}-${safeName}`;
      const upload = await supabase.storage.from("media").upload(path, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upload.error) {
        setSaving(false);
        toast({ title: "Upload failed", description: upload.error.message, variant: "destructive" });
        return;
      }
      fileUrl = supabase.storage.from("media").getPublicUrl(upload.data.path).data.publicUrl;
    }

    const payload = {
      title: mediaForm.title.trim(),
      description: mediaForm.description.trim() || null,
      media_type: mediaForm.media_type,
      file_url: fileUrl,
      thumbnail_url: mediaForm.thumbnail_url.trim() || null,
      is_published: mediaForm.is_published,
      created_by: user.id,
    };
    const result = editingMediaId
      ? await supabase.from("media_content").update(payload).eq("id", editingMediaId)
      : await supabase.from("media_content").insert(payload);

    setSaving(false);
    if (result.error) {
      toast({ title: "Media not saved", description: result.error.message, variant: "destructive" });
      return;
    }

    setMediaForm({
      title: "",
      description: "",
      media_type: "picture",
      file_url: "",
      thumbnail_url: "",
      is_published: true,
    });
    setSelectedFile(null);
    setEditingMediaId(null);
    await loadContent();
    toast({ title: editingMediaId ? "Media updated" : "Media uploaded" });
  };

  const deleteMedia = async (id: string) => {
    if (!window.confirm("Delete this media item? This action cannot be undone.")) return;
    const { error } = await supabase.from("media_content").delete().eq("id", id);
    if (error) {
      toast({ title: "Media not deleted", description: error.message, variant: "destructive" });
      return;
    }
    setMedia((current) => current.filter((item) => item.id !== id));
    toast({ title: "Media deleted" });
  };

  const saveAnnouncement = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !announcementForm.title.trim() || !announcementForm.content.trim()) return;
    setSaving(true);

    const payload = {
      title: announcementForm.title.trim(),
      content: announcementForm.content.trim(),
      publish_date: announcementForm.publish_date || null,
      is_published: announcementForm.is_published,
      created_by: user.id,
    };
    const result = editingAnnouncementId
      ? await supabase.from("announcements").update(payload).eq("id", editingAnnouncementId)
      : await supabase.from("announcements").insert(payload);

    setSaving(false);
    if (result.error) {
      toast({ title: "Announcement not saved", description: result.error.message, variant: "destructive" });
      return;
    }

    setAnnouncementForm(emptyAnnouncement);
    setEditingAnnouncementId(null);
    await loadContent();
    toast({ title: editingAnnouncementId ? "Announcement updated" : "Announcement published" });
  };

  const deleteAnnouncement = async (id: string) => {
    if (!window.confirm("Delete this announcement? This action cannot be undone.")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      toast({ title: "Announcement not deleted", description: error.message, variant: "destructive" });
      return;
    }
    setAnnouncements((current) => current.filter((announcement) => announcement.id !== id));
    toast({ title: "Announcement deleted" });
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900">Content Management</CardTitle>
        <p className="text-sm text-slate-500">
          Update public events and media without editing the application code.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="events">
          <TabsList className="grid w-full grid-cols-2 md:w-fit md:grid-cols-4">
            <TabsTrigger value="events"><Calendar className="mr-2 h-4 w-4" />Events</TabsTrigger>
            <TabsTrigger value="media"><Image className="mr-2 h-4 w-4" />Media</TabsTrigger>
            <TabsTrigger value="announcements"><Megaphone className="mr-2 h-4 w-4" />Announcements</TabsTrigger>
            <TabsTrigger value="leadership"><Pencil className="mr-2 h-4 w-4" />Leadership</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6 space-y-6">
            <form onSubmit={saveEvent} className="grid gap-3 rounded-lg border bg-slate-50 p-4 md:grid-cols-2">
              <Input placeholder="Event title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
              <Input type="datetime-local" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required />
              <Input placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
              <Input placeholder="Event type" value={eventForm.event_type} onChange={(e) => setEventForm({ ...eventForm, event_type: e.target.value })} />
              <Textarea className="md:col-span-2" placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit" disabled={saving}><Plus className="mr-2 h-4 w-4" />{editingEventId ? "Update event" : "Add event"}</Button>
                {editingEventId && <Button type="button" variant="outline" onClick={() => { setEditingEventId(null); setEventForm(emptyEvent); }}><X className="mr-2 h-4 w-4" />Cancel</Button>}
              </div>
            </form>
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                  <div><p className="font-semibold">{event.title}</p><p className="text-sm text-slate-500">{new Date(event.event_date).toLocaleString()} {event.location ? `• ${event.location}` : ""}</p></div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditingEventId(event.id); setEventForm({ title: event.title, description: event.description || "", event_date: event.event_date.slice(0, 16), event_type: event.event_type || "church", location: event.location || "", is_published: event.is_published ?? true }); }}><Pencil className="mr-2 h-4 w-4" />Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteEvent(event.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No events yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-6 space-y-6">
            <form onSubmit={saveMedia} className="grid gap-3 rounded-lg border bg-slate-50 p-4 md:grid-cols-2">
              <Input placeholder="Media title" value={mediaForm.title} onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })} required />
              <select className="h-10 rounded-md border bg-white px-3 text-sm" value={mediaForm.media_type} onChange={(e) => setMediaForm({ ...mediaForm, media_type: e.target.value })}><option value="picture">Picture</option><option value="video">Video</option><option value="interview">Interview</option></select>
              <Textarea className="md:col-span-2" placeholder="Description" value={mediaForm.description} onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })} />
              <Input type="file" accept="image/*,video/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
              <Input placeholder="Or paste a public file URL" value={mediaForm.file_url} onChange={(e) => setMediaForm({ ...mediaForm, file_url: e.target.value })} />
              <Input className="md:col-span-2" placeholder="Thumbnail URL (optional)" value={mediaForm.thumbnail_url} onChange={(e) => setMediaForm({ ...mediaForm, thumbnail_url: e.target.value })} />
              <Button type="submit" disabled={saving} className="w-fit"><Upload className="mr-2 h-4 w-4" />{editingMediaId ? "Update media" : "Upload media"}</Button>
            </form>
            <div className="grid gap-3 md:grid-cols-2">
              {media.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div className="min-w-0"><p className="truncate font-semibold">{item.title}</p><p className="text-xs uppercase text-slate-500">{item.media_type}</p></div>
                  <div className="flex shrink-0 gap-2"><Button size="sm" variant="outline" onClick={() => { setEditingMediaId(item.id); setMediaForm({ title: item.title, description: item.description || "", media_type: item.media_type, file_url: item.file_url || "", thumbnail_url: item.thumbnail_url || "", is_published: item.is_published ?? true }); }}><Pencil className="h-4 w-4" /></Button><Button size="sm" variant="destructive" onClick={() => deleteMedia(item.id)}><Trash2 className="h-4 w-4" /></Button></div>
                </div>
              ))}
              {media.length === 0 && <p className="py-8 text-center text-sm text-slate-500 md:col-span-2">No media yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="mt-6 space-y-6">
            <form onSubmit={saveAnnouncement} className="grid gap-3 rounded-lg border bg-slate-50 p-4">
              <Input placeholder="Announcement title" value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} required />
              <Textarea placeholder="Announcement content" value={announcementForm.content} onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })} required />
              <Input type="datetime-local" value={announcementForm.publish_date} onChange={(e) => setAnnouncementForm({ ...announcementForm, publish_date: e.target.value })} />
              <Button type="submit" disabled={saving} className="w-fit"><Megaphone className="mr-2 h-4 w-4" />{editingAnnouncementId ? "Update announcement" : "Publish announcement"}</Button>
            </form>
            <div className="space-y-2">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0"><p className="font-semibold">{announcement.title}</p><p className="text-sm text-slate-500">{announcement.content}</p>{announcement.publish_date && <p className="text-xs text-slate-400">{new Date(announcement.publish_date).toLocaleString()}</p>}</div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditingAnnouncementId(announcement.id); setAnnouncementForm({ title: announcement.title, content: announcement.content, publish_date: announcement.publish_date ? announcement.publish_date.slice(0, 16) : "", is_published: announcement.is_published ?? true }); }}><Pencil className="mr-2 h-4 w-4" />Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteAnnouncement(announcement.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No announcements yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="leadership" className="mt-6">
            <LeadershipManagementTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentManagementTab;
