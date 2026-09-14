
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OurChurch = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Church</h1>
          <p className="text-lg text-gray-600">Learn about our foundation and beliefs</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Who We Are</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed">
              We, being born-again, Bible-believing Christians, following the teachings of the Bible 
              based upon the foundation of the apostles and prophets, Jesus Christ himself being the 
              chief cornerstone; as taught by the Prophet, Reverend{" "}
              <a 
                href="https://branham.org/en/williambranham" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                William Marrion Branham
              </a>{" "}
              (whom we believe to be the Prophet of God that came to fulfil Malachi 4:5,6 and Revelations 10:7), 
              identifying ourselves as End-Time Message Ministry.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Our Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Built upon the solid foundation of the apostles and prophets, with Jesus Christ 
                as the chief cornerstone, we stand firmly on the Word of God as revealed through 
                His prophet for this age.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">End Time Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We believe in the Message brought by Prophet William Marrion Branham, 
                fulfilling the prophecies of Malachi 4:5-6 and Revelation 10:7, 
                preparing the Bride for the coming of the Lord.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Bible-Centered</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Every teaching and practice in our church is grounded in the Holy Scriptures, 
                which we believe to be the perfect, pure, and inerrant Word of God.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Christian Fellowship</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We unite in Christian fellowship and love, seeking to accomplish the will 
                of the Lord Jesus Christ as revealed in these last days.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Our Identity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              As an End-Time Message Ministry, we are not just another denomination, but a people 
              called out by God's Word for this hour. We believe that God has sent a prophet to 
              this generation to restore the faith once delivered to the saints and to prepare 
              a Bride for the second coming of Jesus Christ.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Our church is part of a worldwide move of God, where believers from every nation 
              are hearing the same Message and being gathered together under the Blood of Jesus Christ, 
              united by one faith, one Lord, and one baptism.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default OurChurch;
