
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, Calendar, FileText, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TrusteeDashboard = () => {
  const [financialData, setFinancialData] = useState([]);
  const [pledgeCategories, setPledgeCategories] = useState([]);
  const [stats, setStats] = useState({
    totalTithes: 0,
    totalOfferings: 0,
    totalPledges: 0,
    thisMonthTotal: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFinancialData();
    fetchPledgeCategories();
    calculateStats();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_entries')
        .select(`
          *,
          pledge_categories (name)
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      setFinancialData(data || []);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  };

  const fetchPledgeCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('pledge_categories')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setPledgeCategories(data || []);
    } catch (error) {
      console.error('Error fetching pledge categories:', error);
    }
  };

  const calculateStats = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_entries')
        .select('type, amount, date');

      if (error) throw error;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const totalTithes = data?.filter(entry => entry.type === 'tithe')
        .reduce((sum, entry) => sum + Number(entry.amount), 0) || 0;
      
      const totalOfferings = data?.filter(entry => entry.type === 'offering')
        .reduce((sum, entry) => sum + Number(entry.amount), 0) || 0;
      
      const totalPledges = data?.filter(entry => entry.type === 'pledge')
        .reduce((sum, entry) => sum + Number(entry.amount), 0) || 0;

      const thisMonthTotal = data?.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
      }).reduce((sum, entry) => sum + Number(entry.amount), 0) || 0;

      setStats({ totalTithes, totalOfferings, totalPledges, thisMonthTotal });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const generateReport = (period: string) => {
    toast({
      title: "Generating Report",
      description: `${period} financial report is being prepared...`,
    });
    // TODO: Implement PDF generation
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B4513]">Trustee Dashboard</h1>
          <p className="text-gray-600">Financial stewardship and management</p>
        </div>
        <Badge variant="outline" className="bg-[#8B4513] text-white">
          Trustee Access
        </Badge>
      </div>

      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tithes</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${stats.totalTithes.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Offerings</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${stats.totalOfferings.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pledges</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${stats.totalPledges.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">${stats.thisMonthTotal.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entries">Financial Entries</TabsTrigger>
          <TabsTrigger value="pledges">Pledge Categories</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="add">Add Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.slice(0, 5).map((entry: any) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">${entry.amount}</p>
                        <p className="text-sm text-gray-600">{entry.type}</p>
                      </div>
                      <Badge variant="outline">{new Date(entry.date).toLocaleDateString()}</Badge>
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
                    <span>Add Tithe</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <DollarSign className="w-6 h-6" />
                    <span>Add Offering</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <FileText className="w-6 h-6" />
                    <span>Add Pledge</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <Calendar className="w-6 h-6" />
                    <span>Monthly Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">All Financial Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.map((entry: any) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {entry.type}
                        </Badge>
                      </TableCell>
                      <TableCell>${entry.amount}</TableCell>
                      <TableCell>{entry.pledge_categories?.name || '-'}</TableCell>
                      <TableCell>{entry.description || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => generateReport('Weekly')}
                  className="h-24 flex-col space-y-2 bg-[#8B4513] hover:bg-[#A0522D]"
                >
                  <FileText className="w-8 h-8" />
                  <span>Weekly Report</span>
                </Button>
                <Button 
                  onClick={() => generateReport('Monthly')}
                  variant="outline" 
                  className="h-24 flex-col space-y-2 border-[#8B4513]"
                >
                  <FileText className="w-8 h-8" />
                  <span>Monthly Report</span>
                </Button>
                <Button 
                  onClick={() => generateReport('Yearly')}
                  variant="outline" 
                  className="h-24 flex-col space-y-2 border-[#8B4513]"
                >
                  <FileText className="w-8 h-8" />
                  <span>Yearly Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrusteeDashboard;
