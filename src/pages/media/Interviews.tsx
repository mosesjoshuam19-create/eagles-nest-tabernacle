
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MediaGalleryHeader from "@/components/media/MediaGalleryHeader";
import EmptyMediaState from "@/components/media/EmptyMediaState";
import MediaLoadingSkeleton from "@/components/media/MediaLoadingSkeleton";
import InterviewGallery from "@/components/media/InterviewGallery";

interface InterviewItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchInterviews = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media_content')
        .select('*')
        .eq('media_type', 'interview')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load interviews",
          variant: "destructive",
        });
      } else {
        setInterviews(data || []);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void fetchInterviews();
  }, [fetchInterviews]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = async (interview: InterviewItem) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to download interviews",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(interview.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${interview.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your interview is being downloaded",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the interview",
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
            title="Interviews & Testimonies"
            subtitle="Personal testimonies and interviews sharing God's goodness and miraculous works"
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
          title="Interviews & Testimonies"
          subtitle="Personal testimonies and interviews sharing God's goodness and miraculous works"
        />

        {interviews.length === 0 ? (
          <EmptyMediaState
            title="Coming Soon"
            message="Our interview and testimony collection is being prepared. Check back soon for inspiring stories."
          />
        ) : (
          <InterviewGallery 
            interviews={interviews} 
            onDownload={handleDownload}
            formatDuration={formatDuration}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Interviews;
