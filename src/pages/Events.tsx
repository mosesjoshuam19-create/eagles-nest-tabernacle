
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Events = () => {
  // Function to get the next occurrence of a specific day of the week
  const getNextDayOfWeek = (dayOfWeek: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilNext = (dayOfWeek - currentDay + 7) % 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + (daysUntilNext === 0 ? 7 : daysUntilNext));
    return nextDate;
  };

  // Get next Sunday (0), Wednesday (3), and Friday (5)
  const nextSunday = getNextDayOfWeek(0);
  const nextWednesday = getNextDayOfWeek(3);
  const nextFriday = getNextDayOfWeek(5);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Church Events</h1>
          <p className="text-lg text-gray-600">Join us for worship, fellowship, and spiritual growth</p>
        </div>

        {/* Upcoming Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span>Upcoming Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Sunday Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Join us for worship, prayer, and fellowship as we gather to hear God's Word.</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{nextSunday.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-500">🕘</span>
                      <span>9:00 AM (Sunday School: 8:00 AM)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Wednesday Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Come together in prayer and intercession for our church and community.</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{nextWednesday.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-500">🕕</span>
                      <span>6:00 PM - 7:30 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Friday Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Weekly service for worship and spiritual growth.</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{nextFriday.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-500">🕕</span>
                      <span>6:00 PM - 7:30 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Regular Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Regular Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Sunday</h3>
                <div className="space-y-2">
                  <p className="font-medium">Sunday School: 8:00 AM</p>
                  <p className="font-medium">Morning Service: 9:00 AM</p>
                  <p className="text-sm text-gray-600">Main worship service</p>
                </div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-2">Wednesday</h3>
                <div className="space-y-2">
                  <p className="font-medium">Service: 6:00 PM - 7:30 PM</p>
                  <p className="text-sm text-gray-600">Weekly worship service</p>
                </div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Friday</h3>
                <div className="space-y-2">
                  <p className="font-medium">Service: 6:00 PM - 7:30 PM</p>
                  <p className="text-sm text-gray-600">Weekly worship service</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
