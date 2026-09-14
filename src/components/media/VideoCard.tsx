
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import BrandPlaceholder from "@/components/BrandPlaceholder";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
}

interface VideoCardProps {
  video: VideoItem;
  onDownload: (video: VideoItem) => void;
  formatDuration: (seconds: number) => string;
}

const VideoCard = ({ video, onDownload, formatDuration }: VideoCardProps) => {
  return (
    <div className="group">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {video.thumbnail_url ? (
          <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <BrandPlaceholder className="h-full w-full bg-slate-50 p-10 object-contain" />
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white text-black hover:bg-gray-200">
              <Eye className="w-4 h-4 mr-1" />
              Watch
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => onDownload(video)}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        {video.duration && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {formatDuration(video.duration)}
          </div>
        )}

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded p-1">
          <BrandPlaceholder className="w-4 h-4 object-contain opacity-80" />
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="font-semibold text-black text-sm line-clamp-2 mb-1">{video.title}</h3>
        {video.description && (
          <p className="text-gray-600 text-xs line-clamp-1 mb-1">{video.description}</p>
        )}
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-xs">
            {new Date(video.created_at).toLocaleDateString()}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
