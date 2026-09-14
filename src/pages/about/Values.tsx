
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Values = () => {
  const values = [
    {
      title: "Biblical Foundation",
      description: "Everything we do is grounded in the Holy Scriptures, which we believe to be the perfect, pure, and inerrant Word of God.",
      verse: "Psalms 19:7 - The law of the LORD is perfect, converting the soul"
    },
    {
      title: "End Time Message",
      description: (
        <>
          We follow the revelation given through Prophet{" "}
          <a 
            href="https://branham.org/en/williambranham" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            William Marrion Branham
          </a>{" "}
          for this end time generation.
        </>
      ),
      verse: "Malachi 4:5-6 - Behold, I will send you Elijah the prophet before the coming of the great and dreadful day of the LORD"
    },
    {
      title: "Christian Fellowship",
      description: "We unite in love and fellowship, supporting one another in the faith and growing together spiritually.",
      verse: "Acts 2:42 - And they continued stedfastly in the apostles' doctrine and fellowship"
    },
    {
      title: "Holiness and Separation",
      description: "We live holy lives, separated unto God and from the world, following the teachings of Christ.",
      verse: "1 Peter 1:16 - Because it is written, Be ye holy; for I am holy"
    },
    {
      title: "Unity in Faith",
      description: "We speak the same thing and are united in the same mind and judgment through God's Word.",
      verse: "1 Corinthians 1:10 - That ye all speak the same thing, and that there be no divisions among you"
    },
    {
      title: "Missionary Heart",
      description: "We have a burden for souls and support missionary work to spread the Gospel worldwide.",
      verse: "Mark 16:15 - Go ye into all the world, and preach the gospel to every creature"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h1>
          <p className="text-lg text-gray-600">The principles that guide our church family</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 mb-4">
                  {typeof value.description === 'string' ? (
                    <p>{value.description}</p>
                  ) : (
                    <p>{value.description}</p>
                  )}
                </div>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-sm text-blue-800 bg-blue-50 p-3 rounded">
                  {value.verse}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">Living Our Values</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed text-center">
              These values are not just words on a page, but the living principles that shape how we 
              worship, fellowship, and serve together as the Body of Christ. Through the Message of 
              the Hour, we have been called to a higher standard of Christian living that reflects 
              the character of our Lord Jesus Christ.
            </p>
            <p className="text-lg leading-relaxed text-center mt-4">
              As we grow together in faith and unity, these values continue to guide us in becoming 
              the kind of church that God can use to accomplish His eternal purposes in these last days.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Values;
