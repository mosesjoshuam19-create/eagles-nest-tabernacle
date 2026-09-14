
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Video, Camera, Radio } from "lucide-react";

interface MediaStatsCardsProps {
  picturesCount: number;
  videosCount: number;
  interviewsCount: number;
  publishedCount: number;
}

const MediaStatsCards = ({ picturesCount, videosCount, interviewsCount, publishedCount }: MediaStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pictures</CardTitle>
          <Image className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{picturesCount}</div>
        </CardContent>
      </Card>
      
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Videos</CardTitle>
          <Video className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{videosCount}</div>
        </CardContent>
      </Card>
      
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          <Camera className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{interviewsCount}</div>
        </CardContent>
      </Card>
      
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published</CardTitle>
          <Radio className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{publishedCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaStatsCards;
