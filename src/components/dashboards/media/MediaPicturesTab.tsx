
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

interface MediaPicturesTabProps {
  pictures: any[];
}

const MediaPicturesTab = ({ pictures }: MediaPicturesTabProps) => {
  return (
    <Card className="border-[#8B4513]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#8B4513]">Picture Gallery</CardTitle>
        <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Pictures
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pictures.map((picture: any) => (
              <TableRow key={picture.id}>
                <TableCell>{picture.title}</TableCell>
                <TableCell>{picture.description || '-'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={picture.is_published ? 'text-green-600' : 'text-orange-600'}>
                    {picture.is_published ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(picture.created_at).toLocaleDateString()}</TableCell>
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

export default MediaPicturesTab;
