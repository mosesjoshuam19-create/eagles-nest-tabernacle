
import VideoCard from "./VideoCard";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
}

interface VideoGalleryProps {
  videos: VideoItem[];
  onDownload: (video: VideoItem) => void;
  formatDuration: (seconds: number) => string;
}

const VideoGallery = ({ videos, onDownload, formatDuration }: VideoGalleryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {videos.map((video) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onDownload={onDownload}
          formatDuration={formatDuration}
        />
      ))}
    </div>
  );
};

export default VideoGallery;
