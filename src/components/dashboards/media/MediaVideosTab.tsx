
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

interface MediaVideosTabProps {
  videos: any[];
}

const MediaVideosTab = ({ videos }: MediaVideosTabProps) => {
  return (
    <Card className="border-[#8B4513]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#8B4513]">Video Library</CardTitle>
        <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Videos
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video: any) => (
              <TableRow key={video.id}>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '-'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={video.is_published ? 'text-green-600' : 'text-orange-600'}>
                    {video.is_published ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(video.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="border-[#8B4513]">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MediaVideosTab;
