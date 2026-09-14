
import PictureCard from "./PictureCard";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  created_at: string;
}

interface PictureGalleryProps {
  pictures: MediaItem[];
  onDownload: (picture: MediaItem) => void;
}

const PictureGallery = ({ pictures, onDownload }: PictureGalleryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pictures.map((picture) => (
        <PictureCard 
          key={picture.id} 
          picture={picture} 
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default PictureGallery;
