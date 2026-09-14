
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BrandPlaceholder from "@/components/BrandPlaceholder";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import PastorDashboard from "@/components/dashboards/PastorDashboard";
import TrusteeDashboard from "@/components/dashboards/TrusteeDashboard";
import DeaconDashboard from "@/components/dashboards/DeaconDashboard";
import MusicDirectorDashboard from "@/components/dashboards/MusicDirectorDashboard";
import MediaDirectorDashboard from "@/components/dashboards/MediaDirectorDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user, userRoles, loading } = useAuth();
  const [primaryRole, setPrimaryRole] = useState<string>('');

  useEffect(() => {
    if (userRoles.length > 0) {
      // Determine primary role based on hierarchy
      const roleHierarchy = ['admin', 'pastor', 'trustee', 'deacon', 'music_director', 'media_director', 'member'];
      const userPrimaryRole = roleHierarchy.find(role => userRoles.includes(role)) || 'member';
      setPrimaryRole(userPrimaryRole);
    }
  }, [userRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B4513] mx-auto"></div>
          <p className="mt-4 text-[#8B4513]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has appropriate roles for dashboard access
  const hasStaffRole = userRoles.some(role => 
    ['admin', 'pastor', 'trustee', 'deacon', 'music_director', 'media_director'].includes(role)
  );

  if (!hasStaffRole) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="text-center p-8 border-[#8B4513]">
            <CardHeader>
              <div className="w-24 h-24 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <BrandPlaceholder className="w-16 h-16 object-contain opacity-80" />
              </div>
              <CardTitle className="text-2xl text-[#8B4513]">Access Restricted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This dashboard is reserved for church staff members. 
                If you believe you should have access, please contact the church administrator.
              </p>
              <Badge variant="outline" className="bg-[#F5F5DC] text-[#8B4513]">
                Member Access
              </Badge>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const renderDashboard = () => {
    switch (primaryRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'pastor':
        return <PastorDashboard />;
      case 'trustee':
        return <TrusteeDashboard />;
      case 'deacon':
        return <DeaconDashboard />;
      case 'music_director':
        return <MusicDirectorDashboard />;
      case 'media_director':
        return <MediaDirectorDashboard />;
      default:
        return (
          <Card className="text-center p-8 border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#8B4513]">Welcome to the Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your role-specific dashboard is being prepared.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderDashboard()}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
