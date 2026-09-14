
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image, Video, Camera } from "lucide-react";

const MediaUploadTab = () => {
  return (
    <Card className="border-[#8B4513]">
      <CardHeader>
        <CardTitle className="text-[#8B4513]">Upload Media Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border-2 border-dashed border-[#8B4513] rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <p className="text-lg font-medium text-[#8B4513] mb-2">Upload Media Files</p>
            <p className="text-gray-600 mb-4">Drag and drop your pictures, videos, or audio files here</p>
            <Button className="bg-[#8B4513] hover:bg-[#A0522D]">Choose Files</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
              <Image className="w-8 h-8" />
              <span>Upload Pictures</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
              <Video className="w-8 h-8" />
              <span>Upload Videos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
              <Camera className="w-8 h-8" />
              <span>Upload Interviews</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaUploadTab;
