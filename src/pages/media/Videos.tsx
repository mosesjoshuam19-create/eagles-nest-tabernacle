
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MediaGalleryHeader from "@/components/media/MediaGalleryHeader";
import EmptyMediaState from "@/components/media/EmptyMediaState";
import MediaLoadingSkeleton from "@/components/media/MediaLoadingSkeleton";
import VideoGallery from "@/components/media/VideoGallery";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchVideos = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media_content')
        .select('*')
        .eq('media_type', 'video')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load videos",
          variant: "destructive",
        });
      } else {
        setVideos(data || []);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void fetchVideos();
  }, [fetchVideos]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = async (video: VideoItem) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to download videos",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(video.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${video.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your video is being downloaded",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the video",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <MediaGalleryHeader 
            title="Video Library"
            subtitle="Sermons, teachings, and special moments from Eagle's Nest Tabernacle"
          />
          <MediaLoadingSkeleton />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <MediaGalleryHeader 
          title="Video Library"
          subtitle="Sermons, teachings, and special moments from Eagle's Nest Tabernacle"
        />

        {videos.length === 0 ? (
          <EmptyMediaState
            title="Coming Soon"
            message="Our video library is being prepared. Check back soon for sermons and teachings."
          />
        ) : (
          <VideoGallery 
            videos={videos} 
            onDownload={handleDownload}
            formatDuration={formatDuration}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Videos;
