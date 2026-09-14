
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield } from "lucide-react";

const SystemSettingsTab = () => {
  return (
    <Card className="border-[#8B4513]">
      <CardHeader>
        <CardTitle className="text-[#8B4513]">System Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
            <Settings className="w-6 h-6" />
            <span>General Settings</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
            <Shield className="w-6 h-6" />
            <span>Security Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettingsTab;
