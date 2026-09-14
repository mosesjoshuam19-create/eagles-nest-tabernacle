
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import MediaDirectorHeader from "./media/MediaDirectorHeader";
import MediaStatsCards from "./media/MediaStatsCards";
import MediaOverviewTab from "./media/MediaOverviewTab";
import MediaPicturesTab from "./media/MediaPicturesTab";
import MediaVideosTab from "./media/MediaVideosTab";
import MediaStreamingTab from "./media/MediaStreamingTab";
import MediaUploadTab from "./media/MediaUploadTab";

const MediaDirectorDashboard = () => {
  const [mediaContent, setMediaContent] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchMediaContent();
  }, []);

  const fetchMediaContent = async () => {
    try {
      const { data, error } = await supabase
        .from('media_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const allMedia = data || [];
      setMediaContent(allMedia);
      setPictures(allMedia.filter(m => m.media_type === 'picture'));
      setVideos(allMedia.filter(m => m.media_type === 'video'));
      setInterviews(allMedia.filter(m => m.media_type === 'interview'));
    } catch (error) {
      console.error('Error fetching media content:', error);
    }
  };

  return (
    <div className="space-y-6">
      <MediaDirectorHeader />
      
      <MediaStatsCards 
        picturesCount={pictures.length}
        videosCount={videos.length}
        interviewsCount={interviews.length}
        publishedCount={mediaContent.filter(m => m.is_published).length}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pictures">Pictures</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="streaming">Streaming</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MediaOverviewTab mediaContent={mediaContent} />
        </TabsContent>

        <TabsContent value="pictures" className="space-y-6">
          <MediaPicturesTab pictures={pictures} />
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <MediaVideosTab videos={videos} />
        </TabsContent>

        <TabsContent value="interviews" className="space-y-6">
          <MediaPicturesTab pictures={interviews} />
        </TabsContent>

        <TabsContent value="streaming" className="space-y-6">
          <MediaStreamingTab />
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <MediaUploadTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaDirectorDashboard;
