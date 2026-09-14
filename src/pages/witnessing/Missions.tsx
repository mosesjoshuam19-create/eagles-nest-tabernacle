
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Heart, Users } from "lucide-react";

const Missions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Missions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Church supports missionary work consistent with our own beliefs and practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Global Outreach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  All missionaries supported by our Church are generally in agreement with the doctrines and practices of this Church. The Pastor makes a decision about whether a missionary or mission project meets the requirements of this End Time Message Ministry.
                </p>
                <p className="text-gray-600">
                  We support mission work that aligns with the End Time Message as revealed through Prophet{" "}
                  <a 
                    href="https://branham.org/en/williambranham" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    William Marrion Branham
                  </a>.
                </p>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  Love Offerings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Designated personal or special (love) offerings by the Members of this Church will be honoured when the designated project or person is in harmony with the doctrines and practices of our Church.
                </p>
                <p className="text-gray-600">
                  The amount to be given must not be in conflict with the church budget and mission priorities.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                Mission Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Our mission support is based on the following principles:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Agreement with End Time Message doctrines and practices</li>
                  <li>Pastoral approval for all missionary endeavors</li>
                  <li>Alignment with the teachings of Prophet{" "}
                    <a 
                      href="https://branham.org/en/williambranham" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      William Marrion Branham
                    </a>
                  </li>
                  <li>Commitment to spreading the Gospel according to our beliefs</li>
                  <li>Regular communication and accountability</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Missions;
