
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, FileText, Users, DollarSign, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DeaconDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({ total: 0, thisMonth: 0 });
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    fetchActivities();
    fetchEvents();
    fetchFinancialSummary();
    fetchAssignedTasks();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchFinancialSummary = async () => {
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

      setFinancialSummary({ total, thisMonth });
    } catch (error) {
      console.error('Error fetching financial summary:', error);
    }
  };

  const fetchAssignedTasks = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('assigned_to', user.user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAssignedTasks(data || []);
    } catch (error) {
      console.error('Error fetching assigned tasks:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B4513]">Deacon Dashboard</h1>
          <p className="text-gray-600">Serving the church community with dedication</p>
        </div>
        <Badge variant="outline" className="bg-[#8B4513] text-white">
          Deacon Access
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{assignedTasks.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{events.filter(e => new Date(e.event_date) > new Date()).length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Giving</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${financialSummary.total.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${financialSummary.thisMonth.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="activities">All Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Assigned Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedTasks.map((task: any) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          task.status === 'pending' ? 'text-orange-600' : 
                          task.status === 'active' ? 'text-blue-600' : 'text-green-600'
                        }>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-[#8B4513]">
                          Update Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#8B4513]">Church Events</CardTitle>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                Create Event
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event: any) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(event.event_date).toLocaleDateString()}</TableCell>
                      <TableCell>{event.location || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={event.is_published ? 'text-green-600' : 'text-orange-600'}>
                          {event.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-[#8B4513] mb-2">Total Church Giving</h3>
                  <p className="text-3xl font-bold text-[#8B4513]">${financialSummary.total.toLocaleString()}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-[#8B4513] mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-[#8B4513]">${financialSummary.thisMonth.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Financial reports are managed by the Trustee. Contact the Trustee for detailed reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeaconDashboard;
