
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Calendar, MessageSquare, FileText, Plus, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PastorDashboard = () => {
  const [financialStats, setFinancialStats] = useState({ total: 0, thisMonth: 0 });
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [deacons, setDeacons] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchFinancialStats();
    fetchActivities();
    fetchProjects();
    fetchQuestions();
    fetchDeacons();
  }, []);

  const fetchFinancialStats = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_entries')
        .select('amount, date');

      if (error) throw error;

      const total = data?.reduce((sum, entry) => sum + Number(entry.amount), 0) || 0;
      const currentMonth = new Date().getMonth();
      const thisMonth = data?.filter(entry => 
        new Date(entry.date).getMonth() === currentMonth
      ).reduce((sum, entry) => sum + Number(entry.amount), 0) || 0;

      setFinancialStats({ total, thisMonth });
    } catch (error) {
      console.error('Error fetching financial stats:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions_answers')
        .select(`
          *,
          profiles!questions_answers_asked_by_fkey (first_name, last_name)
        `)
        .eq('status', 'pending')
        .order('asked_at', { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchDeacons = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles!inner (role)
        `)
        .eq('user_roles.role', 'deacon');

      if (error) throw error;
      setDeacons(data || []);
    } catch (error) {
      console.error('Error fetching deacons:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B4513]">Pastor Dashboard</h1>
          <p className="text-gray-600">Shepherd the flock with wisdom and care</p>
        </div>
        <Badge variant="outline" className="bg-[#8B4513] text-white">
          Pastor Access
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Giving</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${financialStats.total.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${financialStats.thisMonth.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Questions</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{questions.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deacons</CardTitle>
            <Users className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{deacons.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="qa">Q&A Forum</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity: any) => (
                    <div key={activity.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <Badge variant="outline" className={
                          activity.status === 'pending' ? 'text-orange-600' : 
                          activity.status === 'active' ? 'text-green-600' : 'text-gray-600'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2 bg-[#8B4513] hover:bg-[#A0522D]">
                    <Plus className="w-6 h-6" />
                    <span>Create Activity</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <FileText className="w-6 h-6" />
                    <span>New Announcement</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <Calendar className="w-6 h-6" />
                    <span>Schedule Event</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <MessageSquare className="w-6 h-6" />
                    <span>Daily Quote</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qa" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Pending Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((qa: any) => (
                  <div key={qa.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Question from {qa.profiles?.first_name} {qa.profiles?.last_name}</h4>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{qa.question}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-[#8B4513] hover:bg-[#A0522D]">Answer</Button>
                      <Button size="sm" variant="outline">Mark Private</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Deacon Team</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deacons.map((deacon: any) => (
                    <TableRow key={deacon.id}>
                      <TableCell>{deacon.first_name} {deacon.last_name}</TableCell>
                      <TableCell>{deacon.email}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-[#8B4513]">
                          Assign Task
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PastorDashboard;
