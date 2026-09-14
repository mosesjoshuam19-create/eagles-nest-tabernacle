
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Church } from "lucide-react";

const Satellite = () => {
  const satellites = [
    {
      name: "Chibakha Church",
      distance: "15 km from Lilongwe City",
      leaders: ["Brother Rhodwell Mphonde", "Brother Handiwell Kaunda"]
    },
    {
      name: "Nyanga Church", 
      distance: "20 km from Lilongwe City",
      leaders: ["Brother Arnold Maida", "Brother Fara"]
    },
    {
      name: "Chalendewa Church",
      distance: "25 km from Lilongwe City", 
      leaders: ["Brother Paul Chisangwi", "Brother Bwanamkubwa"]
    },
    {
      name: "Chilibale Church",
      distance: "30 km from Lilongwe City",
      leaders: ["Brother Jackie Njolomole"]
    },
    {
      name: "Chibimphi Church", 
      distance: "30 km from Lilongwe City",
      leaders: ["Brother Jackie Njolomole"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Satellite Assemblies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End Time Message Ministry local assemblies established in rural and urban Lilongwe district
            </p>
          </div>

          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Church className="w-6 h-6 text-blue-600" />
                  About Our Satellite Churches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The term "End Time Message Ministry in Lilongwe" shall be used to refer to all local assemblies that are established in rural and urban Lilongwe district, with the help of our Church.
                </p>
                <p className="text-gray-600">
                  Each local assembly, established with the help of our Church, may choose to use any name agreed upon by the said church by a majority of vote.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {satellites.map((satellite, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    {satellite.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{satellite.distance}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Leadership:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {satellite.leaders.map((leader, idx) => (
                        <li key={idx} className="pl-4">• {leader}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  We currently have five satellite churches in the rural communities of Lilongwe, 
                  with distances ranging from 15 to 30 kilometers from Lilongwe City.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Satellite;
