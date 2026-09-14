
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText } from "lucide-react";

interface AdminStatsCardsProps {
  stats: {
    totalUsers: number;
    totalEvents: number;
    totalProjects: number;
    totalAnnouncements: number;
  };
}

const AdminStatsCards = ({ stats }: AdminStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{stats.totalUsers}</div>
        </CardContent>
      </Card>
      
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Events</CardTitle>
          <Calendar className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{stats.totalEvents}</div>
        </CardContent>
      </Card>
      
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projects</CardTitle>
          <FileText className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{stats.totalProjects}</div>
        </CardContent>
      </Card>
      
      <Card className="border-[#8B4513]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Announcements</CardTitle>
          <FileText className="h-4 w-4 text-[#8B4513]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#8B4513]">{stats.totalAnnouncements}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatsCards;
