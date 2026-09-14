
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Mission = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h1>
          <p className="text-lg text-gray-600">Our calling and purpose</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-900">The Great Commission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-500 pl-6 py-4">
              "Go into all the world and preach the Gospel to all creatures and baptize 
              whosoever believes in the Name of the Lord, Jesus Christ, for the remission of their sin."
            </blockquote>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Our Purpose</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed">
              To fulfil our Mission, we together, as a Church, seek to accomplish the will of the 
              Lord Jesus Christ as revealed in this last days through the fulfilment of the Ministry 
              of the Prophet, Reverend{" "}
              <a 
                href="https://branham.org/en/williambranham" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                William Marrion Branham
              </a>, as we unite in Christian fellowship and love.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Preach the Gospel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We are called to take the Gospel message to every creature, 
                sharing the good news of salvation through Jesus Christ with all who will hear.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Baptize Believers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Following the scriptural pattern, we baptize believers in the Name of the 
                Lord Jesus Christ for the remission of sins, as commanded by the apostles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Fellowship & Love</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We unite together in Christian fellowship and love, supporting one another 
                in the faith and growing together in the knowledge of our Lord Jesus Christ.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Fulfill God's Will</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our ultimate goal is to accomplish the will of the Lord Jesus Christ 
                as revealed through His Word and confirmed by His prophet for this age.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">The Message of the Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              Through the ministry of Prophet{" "}
              <a 
                href="https://branham.org/en/williambranham" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                William Marrion Branham
              </a>, God has revealed His will 
              for this end time generation. We are committed to following this divine revelation, 
              understanding that it is God's way of preparing a Bride for the second coming of 
              Jesus Christ.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              As we unite in Christian fellowship and love, we seek not only to grow numerically 
              but more importantly to grow spiritually, becoming the kind of church that God can 
              use to accomplish His eternal purposes in these last days.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Mission;
