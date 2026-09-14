
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminStatsCards from "./admin/AdminStatsCards";
import UserManagementTab from "./admin/UserManagementTab";
import SystemSettingsTab from "./admin/SystemSettingsTab";
import ContentManagementTab from "./admin/ContentManagementTab";
import ReportsTab from "./admin/ReportsTab";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalProjects: 0,
    totalAnnouncements: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles (role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [usersCount, eventsCount, projectsCount, announcementsCount] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('announcements').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        totalUsers: usersCount.count || 0,
        totalEvents: eventsCount.count || 0,
        totalProjects: projectsCount.count || 0,
        totalAnnouncements: announcementsCount.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const assignRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: role as any });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Role ${role} assigned successfully`,
      });
      
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B4513]">Admin Dashboard</h1>
          <p className="text-gray-600">Complete system administration</p>
        </div>
        <Badge variant="outline" className="bg-[#8B4513] text-white">
          Admin Access
        </Badge>
      </div>

      <AdminStatsCards stats={stats} />

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UserManagementTab users={users} onAssignRole={assignRole} />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <SystemSettingsTab />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentManagementTab />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
