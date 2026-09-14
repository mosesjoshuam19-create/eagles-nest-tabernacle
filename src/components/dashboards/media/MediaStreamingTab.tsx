
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

const MediaStreamingTab = () => {
  return (
    <Card className="border-[#8B4513]">
      <CardHeader>
        <CardTitle className="text-[#8B4513]">Live Streaming Control</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center p-8 border-2 border-dashed border-[#8B4513] rounded-lg">
            <Radio className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Streaming Status: Offline</h3>
            <p className="text-gray-600 mb-4">Ready to start live streaming</p>
            <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
              Start Live Stream
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-[#8B4513] mb-2">Stream Settings</h4>
              <p className="text-sm text-gray-600">Configure your streaming parameters and quality settings.</p>
              <Button variant="outline" className="mt-2 border-[#8B4513]">Configure</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-[#8B4513] mb-2">Archive Management</h4>
              <p className="text-sm text-gray-600">Manage and organize your streaming archives.</p>
              <Button variant="outline" className="mt-2 border-[#8B4513]">Manage</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaStreamingTab;
