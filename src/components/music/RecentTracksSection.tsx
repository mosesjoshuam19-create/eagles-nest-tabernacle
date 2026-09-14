
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music as MusicIcon, Play, Download } from "lucide-react";
import { formatDuration } from "@/utils/dateHelpers";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  category_id: string;
  date_recorded: string;
  music_categories: {
    title: string;
  };
}

interface RecentTracksSectionProps {
  tracks: MusicTrack[];
}

const RecentTracksSection = ({ tracks }: RecentTracksSectionProps) => {
  if (tracks.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center space-x-2">
          <MusicIcon className="w-6 h-6 text-blue-600" />
          <span>Recent Recordings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tracks.map((track) => (
            <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                  <Play className="w-4 h-4" />
                </Button>
                <div>
                  <h3 className="font-medium">{track.title}</h3>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{track.music_categories?.title}</Badge>
                <span className="text-sm text-gray-500">
                  {track.duration ? formatDuration(track.duration) : '-'}
                </span>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTracksSection;
