
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Radio, Image, Video } from "lucide-react";

interface MediaOverviewTabProps {
  mediaContent: any[];
}

const MediaOverviewTab = ({ mediaContent }: MediaOverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-[#8B4513]">
        <CardHeader>
          <CardTitle className="text-[#8B4513]">Recent Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mediaContent.slice(0, 5).map((media: any) => (
              <div key={media.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="font-medium">{media.title}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {media.media_type}
                    </Badge>
                    <Badge variant="outline" className={media.is_published ? 'text-green-600' : 'text-orange-600'}>
                      {media.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#8B4513]">
        <CardHeader>
          <CardTitle className="text-[#8B4513]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-20 flex-col space-y-2 bg-[#8B4513] hover:bg-[#A0522D]">
              <Upload className="w-6 h-6" />
              <span>Upload Media</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
              <Radio className="w-6 h-6" />
              <span>Start Stream</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
              <Image className="w-6 h-6" />
              <span>Photo Gallery</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
              <Video className="w-6 h-6" />
              <span>Video Library</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaOverviewTab;
