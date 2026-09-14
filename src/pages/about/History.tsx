
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const History = () => {
  const milestones = [
    {
      year: "2014",
      title: "Church Founded",
      description: "Founded as an outpost of the Bible Believers Livimbo Tabernacle within Lilongwe with 5 families. With the help of the Holy Spirit, we began our journey in faith.",
      highlight: true
    },
    {
      year: "2015-2022",
      title: "Growth and Expansion",
      description: "Through God's grace, we experienced both membership and spiritual growth, establishing strong foundations in the End Time Message teachings."
    },
    {
      year: "2023",
      title: "Pastor Ordination",
      description: "We ordained Pastor Harry Kamenya, who took care of our three satellite churches located 50-70 kilometers away from Lilongwe city. The churches there continue to thrive both in membership and spiritually.",
      highlight: true
    },
    {
      year: "2024",
      title: "Church Handover",
      description: "We handed over a satellite church that we had been administering for over seven years to Pastor Chisangwi, a seasoned Minister of the Gospel who has several churches in Mozambique."
    },
    {
      year: "Present",
      title: "Current Ministry",
      description: "We currently oversee five satellite churches in the rural communities of Lilongwe, with distances ranging from 15 to 30 kilometers from Lilongwe City.",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our History</h1>
          <p className="text-lg text-gray-600">A decade of God's faithfulness</p>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">10 Years of Ministry</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed text-center">
              Since our founding in 2014, God has been faithful to grow our church family from 
              5 families to a thriving ministry with multiple satellite churches. Our journey 
              has been marked by spiritual growth, missionary expansion, and unwavering commitment 
              to the End Time Message.
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start space-x-6">
                {/* Timeline dot */}
                <div className={`w-4 h-4 rounded-full border-4 bg-white relative z-10 ${
                  milestone.highlight ? 'border-blue-600' : 'border-blue-300'
                }`}></div>
                
                {/* Content */}
                <Card className={`flex-1 ${milestone.highlight ? 'ring-2 ring-blue-200' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-blue-900">{milestone.title}</CardTitle>
                      <Badge variant={milestone.highlight ? "default" : "outline"}>
                        {milestone.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Current Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">10</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Years of Ministry</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">5</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Satellite Churches</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">70km</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Maximum Distance Covered</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">Looking Forward</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed text-center">
              As we continue our journey, we remain committed to the Great Commission and the 
              Message of the Hour. Our vision is to continue expanding God's kingdom through 
              new satellite churches, deeper spiritual growth, and faithful adherence to the 
              teachings of Prophet William Marrion Branham. We believe our best days are yet ahead 
              as we prepare for the coming of our Lord Jesus Christ.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default History;
