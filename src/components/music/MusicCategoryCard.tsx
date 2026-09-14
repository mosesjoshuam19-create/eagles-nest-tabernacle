
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music as MusicIcon } from "lucide-react";

interface MusicCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  track_count?: number;
}

interface MusicCategoryCardProps {
  category: MusicCategory;
}

const MusicCategoryCard = ({ category }: MusicCategoryCardProps) => {
  return (
    <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <MusicIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-lg">{category.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary mb-2">{category.track_count}</p>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </CardContent>
    </Card>
  );
};

export default MusicCategoryCard;
