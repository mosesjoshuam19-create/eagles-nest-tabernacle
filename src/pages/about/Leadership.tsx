
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Leader {
  id: string;
  name: string;
  position: string;
  description: string;
  image?: string;
  biography: string;
  responsibility?: string;
}

const Leadership = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  const pastor: Leader = {
    id: "pastor",
    name: "Pastor Leslie Mkandawire",
    position: "Pastor",
    description: "Lead Pastor emphasizing balanced ministry approach",
    biography: "Pastor Leslie Mkandawire has always emphasized a balanced approach to ministry. Teaching on being born again in Christ Jesus, character, relationship with Christ, family, marriage and reaching beyond the walls of our church to spread the Message of the Hour worldwide. His ministry focuses on practical Christian living while maintaining the fundamental truths of the End Time Message.",
    image: "/placeholder.svg"
  };

  const deacons: Leader[] = [
    {
      id: "timothy",
      name: "Brother Timothy Tcheleni",
      position: "Chairman of the Board",
      description: "Chairman of the Deacon Board",
      biography: "Brother Timothy Tcheleni serves as the Chairman of the Board of Deacons. He is a Holy Spirit filled man who acts in an office of spiritual assistance to the pastors, responsible for benefits that bless the general and spiritual welfare of the church.",
      image: "/placeholder.svg"
    },
    {
      id: "joseph",
      name: "Brother Joseph Mkandgo",
      position: "Deacon",
      description: "Deacon serving the church",
      biography: "Brother Joseph Mkandgo is one of our seven Holy Spirit filled deacons who serve in spiritual assistance to the pastors, working for the general and spiritual welfare of our church community.",
      image: "/placeholder.svg"
    },
    {
      id: "precious",
      name: "Brother Precious Chitsulo",
      position: "Deacon",
      description: "Deacon serving the church",
      biography: "Brother Precious Chitsulo serves as a deacon, dedicated to the spiritual assistance of our pastoral team and the welfare of our church congregation.",
      image: "/placeholder.svg"
    },
    {
      id: "henderson",
      name: "Brother Henderson Chihana",
      position: "Deacon",
      description: "Deacon serving the church",
      biography: "Brother Henderson Chihana is a faithful deacon who works alongside our pastoral team to ensure the spiritual and general welfare of our church community.",
      image: "/placeholder.svg"
    },
    {
      id: "yamikani",
      name: "Brother Yamikani Nkhalango",
      position: "Deacon",
      description: "Deacon serving the church",
      biography: "Brother Yamikani Nkhalango serves our church as a deacon, providing spiritual assistance and working for the benefit of our church family.",
      image: "/placeholder.svg"
    },
    {
      id: "wesley",
      name: "Brother Wesley",
      position: "Deacon",
      description: "Deacon serving the church",
      biography: "Brother Wesley is one of our dedicated deacons who serves in spiritual assistance to our pastors and works for the welfare of our church.",
      image: "/placeholder.svg"
    },
    {
      id: "rhodwell",
      name: "Brother Rhodwell Mphonde",
      position: "Deacon - Chibakha Church",
      description: "Responsible for Chibakha Church",
      biography: "Brother Rhodwell Mphonde serves as a deacon with special responsibility for our Chibakha satellite church, ensuring the spiritual welfare of that congregation.",
      responsibility: "Chibakha Church",
      image: "/placeholder.svg"
    }
  ];

  const trustees: Leader[] = [
    {
      id: "portphar",
      name: "Brother Portphar Damiano Mwale",
      position: "Chairman of the Board of Trustees",
      description: "Chairman overseeing church welfare",
      biography: "Brother Portphar Damiano Mwale serves as Chairman of the Board of Trustees. The trustees are the body of men that oversee the welfare of the church as a business group, elected to protect the church in its financial matters, business investments, supervision of properties, and expenditures.",
      image: "/placeholder.svg"
    },
    {
      id: "henry",
      name: "Brother Henry Jack",
      position: "Church Treasurer",
      description: "Managing church finances",
      biography: "Brother Henry Jack serves as our Church Treasurer, responsible for managing the financial affairs of the church and ensuring proper stewardship of God's resources.",
      image: "/placeholder.svg"
    },
    {
      id: "paul",
      name: "Brother Paul Mnelemba",
      position: "Trustee",
      description: "Trustee serving the church",
      biography: "Brother Paul Mnelemba serves as a trustee, helping to oversee the welfare of the church in its business matters and financial stewardship.",
      image: "/placeholder.svg"
    }
  ];

  const allLeaders = [pastor, ...deacons, ...trustees];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h1>
          <p className="text-lg text-gray-600">Meet our pastors, deacons, and trustees</p>
        </div>

        {/* Pastor Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Pastor</h2>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedLeader(pastor)}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <div>
                  <CardTitle className="text-xl">{pastor.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{pastor.position}</p>
                  <p className="text-gray-600">{pastor.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Deacons Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Deacons</h2>
          <p className="text-gray-600 mb-6">
            Seven Holy Spirit Filled men to act in an office of spiritual assistance to the pastors. 
            Responsible for the benefits that would bless the general and spiritual welfare of the church.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deacons.map((deacon) => (
              <Card key={deacon.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedLeader(deacon)}>
                <CardHeader>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-500 text-sm">Photo</span>
                    </div>
                    <CardTitle className="text-lg">{deacon.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{deacon.position}</p>
                    {deacon.responsibility && (
                      <p className="text-sm text-gray-600">Responsible for {deacon.responsibility}</p>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Trustees Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Trustees</h2>
          <p className="text-gray-600 mb-6">
            The body of men that oversee the welfare of the church as a business group. They are elected to 
            protect the church in its financial matters, its business investments, the supervision of its 
            properties, and its expenditures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustees.map((trustee) => (
              <Card key={trustee.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedLeader(trustee)}>
                <CardHeader>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-500 text-sm">Photo</span>
                    </div>
                    <CardTitle className="text-lg">{trustee.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{trustee.position}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Modal */}
        <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-blue-900">
                {selectedLeader?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedLeader && (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Photo</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {selectedLeader.position}
                  </h3>
                  {selectedLeader.responsibility && (
                    <p className="text-sm text-gray-600 mb-3">
                      Responsible for: {selectedLeader.responsibility}
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed">
                    {selectedLeader.biography}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default Leadership;
