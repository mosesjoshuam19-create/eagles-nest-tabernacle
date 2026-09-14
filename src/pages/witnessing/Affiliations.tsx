
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Shield, Users } from "lucide-react";

const Affiliations = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Affiliations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our fellowship with fundamental End Time Message believing churches and individuals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandHeart className="w-6 h-6 text-blue-600" />
                  Christian Fellowship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The Church, while holding to the fundamental End Time Message distinctive of faith and practice, desires to maintain fellowship with all fundamental, separated, End Time Message believing churches and individuals.
                </p>
                <p className="text-gray-600">
                  We seek unity with those who manifest both in faith and practice their agreement with the practices and faith as set forth in the Message of the Hour.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-600" />
                  Separatist Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our Church shall maintain a separatist position towards all modernistic and unbiblical groups.
                </p>
                <p className="text-gray-600">
                  We stand entirely outside the "ecumenical movement," repudiating its ideological position and its organizational structure in the National and World Council of Churches.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                Fellowship Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Our affiliations are based on the following principles:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Adherence to fundamental End Time Message beliefs</li>
                  <li>Separation from modernistic and unbiblical teachings</li>
                  <li>Agreement with the Message of the Hour as revealed through Prophet{" "}
                    <a 
                      href="https://branham.org/en/williambranham" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      William Marrion Branham
                    </a>
                  </li>
                  <li>Commitment to Biblical truth and sound doctrine</li>
                  <li>Manifestation of faith and practice in accordance with the End Time Message</li>
                  <li>Rejection of ecumenical movements and worldly church councils</li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    "That we all speak the same thing" - 1 Corinthians 1:10; Acts 2:42
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Affiliations;
