
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedSections = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Church Family
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a community of believers united in Christian fellowship and love, 
            seeking to accomplish the will of the Lord Jesus Christ as revealed in these last days.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Service Times</CardTitle>
              <CardDescription>Join us for worship and fellowship</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Sunday:</strong> 9:00 AM (School: 8:00 AM)</p>
                <p><strong>Wednesday:</strong> 6:00 PM - 7:30 PM</p>
                <p><strong>Friday:</strong> 6:00 PM - 7:30 PM</p>
              </div>
              <Link to="/services/live">
                <Button className="mt-4" variant="outline">View Live Stream</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Music Ministry</CardTitle>
              <CardDescription>Worship through song and praise</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Experience powerful worship with our music ministry featuring hymns, 
                contemporary songs, and spiritual music.
              </p>
              <Link to="/music">
                <Button className="mt-4" variant="outline">Explore Music</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Missions</CardTitle>
              <CardDescription>Spreading the Gospel worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Supporting missionary work and satellite assemblies throughout 
                Lilongwe district and beyond.
              </p>
              <Link to="/witnessing/missions">
                <Button className="mt-4" variant="outline">Learn More</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Community</CardTitle>
              <CardDescription>Fellowship and growth together</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Join our growing church family with five satellite churches 
                and a strong community foundation.
              </p>
              <Link to="/about/leadership">
                <Button className="mt-4" variant="outline">Meet Leadership</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Latest Events */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Upcoming Services</h3>
            <Link to="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">Sunday Service</h4>
              <p className="text-gray-600">Every Sunday at 9:00 AM (Sunday School: 8:00 AM)</p>
              <p className="text-sm text-gray-500">Join us for worship and fellowship</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900">Prayer Meeting</h4>
              <p className="text-gray-600">Every Wednesday at 6:00 PM - 7:30 PM</p>
              <p className="text-sm text-gray-500">Come together in prayer</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900">Friday Service</h4>
              <p className="text-gray-600">Every Friday at 6:00 PM - 7:30 PM</p>
              <p className="text-sm text-gray-500">Weekly worship service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
