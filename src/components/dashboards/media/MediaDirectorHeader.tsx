
import { Badge } from "@/components/ui/badge";

const MediaDirectorHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-[#8B4513]">Media Director Dashboard</h1>
        <p className="text-gray-600">Managing all church media and streaming</p>
      </div>
      <Badge variant="outline" className="bg-[#8B4513] text-white">
        Media Director Access
      </Badge>
    </div>
  );
};

export default MediaDirectorHeader;
