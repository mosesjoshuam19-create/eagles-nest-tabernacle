
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MediaGalleryHeader from "@/components/media/MediaGalleryHeader";
import EmptyMediaState from "@/components/media/EmptyMediaState";
import MediaLoadingSkeleton from "@/components/media/MediaLoadingSkeleton";
import PictureGallery from "@/components/media/PictureGallery";
import { useMediaContent } from "@/hooks/useMediaContent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  created_at: string;
}

const Pictures = () => {
  const { items: pictures, loading } = useMediaContent('picture');
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedPicture, setSelectedPicture] = useState<MediaItem | null>(null);

  const handleView = (picture: MediaItem) => {
    setSelectedPicture(picture);
  };

  const handleDownload = async (picture: MediaItem) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to download pictures",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(picture.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${picture.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your picture is being downloaded",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the picture",
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
            title="Photo Gallery"
            subtitle="Capturing moments of faith, fellowship, and worship at Eagle's Nest Tabernacle"
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
          title="Photo Gallery"
          subtitle="Capturing moments of faith, fellowship, and worship at Eagle's Nest Tabernacle"
        />

        {pictures.length === 0 ? (
          <EmptyMediaState
            title="Coming Soon"
            message="Our photo gallery is being prepared. Check back soon for beautiful moments from our church family."
          />
        ) : (
          <PictureGallery pictures={pictures} onView={handleView} onDownload={handleDownload} />
        )}
      </div>
      <Dialog open={!!selectedPicture} onOpenChange={(open) => !open && setSelectedPicture(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{selectedPicture?.title}</DialogTitle>
          </DialogHeader>
          {selectedPicture && (
            <div className="flex max-h-[75vh] items-center justify-center overflow-auto rounded-lg bg-slate-950 p-2">
              {selectedPicture.file_url || selectedPicture.thumbnail_url ? (
                <img
                  src={selectedPicture.file_url || selectedPicture.thumbnail_url || undefined}
                  alt={selectedPicture.title}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              ) : (
                <p className="p-12 text-center text-white">This picture does not have an image URL.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Pictures;
