import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import BrandPlaceholder from "@/components/BrandPlaceholder";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  created_at: string;
}

interface PictureCardProps {
  picture: MediaItem;
  onView: (picture: MediaItem) => void;
  onDownload: (picture: MediaItem) => void;
}

const PictureCard = ({ picture, onView, onDownload }: PictureCardProps) => {
  return (
    <div className="group">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {picture.thumbnail_url || picture.file_url ? (
          <img
            src={picture.thumbnail_url || picture.file_url || undefined}
            alt={picture.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <BrandPlaceholder className="h-full w-full bg-slate-50 p-10 object-contain group-hover:scale-105 transition-transform duration-300" />
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => onView(picture)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => onDownload(picture)}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded p-1">
          <BrandPlaceholder className="w-4 h-4 object-contain opacity-80" />
        </div>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold text-black text-sm line-clamp-2 mb-1">
          {picture.title}
        </h3>
        {picture.description && (
          <p className="text-gray-600 text-xs line-clamp-1 mb-1">
            {picture.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-xs">
            {new Date(picture.created_at).toLocaleDateString()}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
