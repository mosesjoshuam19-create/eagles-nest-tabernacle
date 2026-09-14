
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const LiveStreaming = () => {
  const [countdown, setCountdown] = useState<string>("");

  // Function to get the next service time
  const getNextServiceTime = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    let nextService = new Date();
    
    // Sunday service at 9:00 AM
    if (currentDay === 0 && (currentHour < 9 || (currentHour === 9 && currentMinute < 0))) {
      nextService.setHours(9, 0, 0, 0);
    }
    // Wednesday service at 6:00 PM
    else if (currentDay === 3 && (currentHour < 18 || (currentHour === 18 && currentMinute < 0))) {
      nextService.setHours(18, 0, 0, 0);
    }
    // Friday service at 6:00 PM
    else if (currentDay === 5 && (currentHour < 18 || (currentHour === 18 && currentMinute < 0))) {
      nextService.setHours(18, 0, 0, 0);
    }
    // Next Sunday
    else {
      const daysUntilSunday = (7 - currentDay) % 7;
      nextService.setDate(now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
      nextService.setHours(9, 0, 0, 0);
    }
    
    return nextService;
  };

  useEffect(() => {
    const updateCountdown = () => {
      const nextService = getNextServiceTime();
      const now = new Date();
      const diff = nextService.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (days > 0) {
          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }
      } else {
        setCountdown("Service is live now!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Streaming</h1>
          <p className="text-lg text-gray-600">Join us for live worship services</p>
        </div>

        {/* Countdown to Next Service */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Next Service Countdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">{countdown}</div>
              <p className="text-gray-600">Until the next live service</p>
            </div>
          </CardContent>
        </Card>

        {/* Live Stream Player */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center gap-3">
              <CardTitle className="text-2xl">Live Service</CardTitle>
              <Badge variant="destructive" className="bg-red-600">● LIVE</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 text-white shadow-inner">
              <div className="flex h-full flex-col items-center justify-center rounded-lg border border-white/10 bg-black/20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl shadow-lg shadow-red-600/20">
                  ▶
                </div>
                <p className="mb-2 text-2xl font-semibold">Join our live worship</p>
                <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                  Tune in to our YouTube channel for live services, prayer, and ministry updates.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => window.open('https://www.youtube.com/@endtimemessageministry-bwa5344', '_blank')}
              >
                Watch on YouTube
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Service Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <div>
                    <p className="font-medium">Sunday Morning Service</p>
                    <p className="text-sm text-gray-600">Main worship service (Sunday School: 8:00 AM)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">9:00 AM</p>
                    <p className="text-sm text-gray-500">Every Sunday</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <div>
                    <p className="font-medium">Wednesday Prayer Meeting</p>
                    <p className="text-sm text-gray-600">Prayer and intercession</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">6:00 PM</p>
                    <p className="text-sm text-gray-500">1.5 hours</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <div>
                    <p className="font-medium">Friday Service</p>
                    <p className="text-sm text-gray-600">Weekly worship service</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">6:00 PM</p>
                    <p className="text-sm text-gray-500">1.5 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">How to Watch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-red-600 mb-2">YouTube Channel</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Watch our live ministries, sermons, and worship directly from the official ETM YouTube channel.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open('https://www.youtube.com/@endtimemessageministry-bwa5344', '_blank')}
                  >
                    Visit YouTube Channel
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-blue-600 mb-2">Live Schedule</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Join us regularly for our Sunday, Wednesday, and Friday worship gatherings.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => window.open('https://www.youtube.com/@endtimemessageministry-bwa5344', '_blank')}>
                    Check Upcoming Services
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Chat Component */}
        <LiveChat />
      </div>
      <Footer />
    </div>
  );
};

export default LiveStreaming;
