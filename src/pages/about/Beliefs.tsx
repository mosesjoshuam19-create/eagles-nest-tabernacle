
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Beliefs = () => {
  const beliefs = [
    {
      title: "The Holy Scripture",
      content: "We believe that the only thing in this universe that is perfect (Psalms 19:7), pure (Psalms 19:8; 119:140), without error (Psalms 12:6, 7), and capable of directing men to God (John 20:31) is the written word of God, the Holy Scripture."
    },
    {
      title: "The One True God",
      content: "We believe that the Scriptures present its Author as the One, and only One living (Joshua 3:10), true, and eternal God (Isaiah 45:21; Deuteronomy 6:4)."
    },
    {
      title: "Man Created in God's Image",
      content: "We believe that man was created in the image of God (Genesis 1:26-28) as described in the accounts in Genesis, and that that image was marred (Colossians 3:9,10) by wilful disobedience (Genesis 3:6; Romans 5:19) when the father of the human race, Adam (Romans 5:12), voluntarily transgressed God's Word."
    },
    {
      title: "Sacrifice for Sin",
      content: "We believe that God ordained that man's sins could not be paid for in any other way than through the sacrifice of an innocent lamb (Exodus 12:5)."
    },
    {
      title: "The Original Sin",
      content: "The Bible says that Eve was beguiled by the serpent and we believe that she was actually seduced by the serpent to commit an act that resulted into the birth of Cain. This original sin was a sexual act between the serpent and Eve."
    },
    {
      title: "The Church",
      content: "There is only one Church, and you do not join in It; you are born in this Church of God."
    },
    {
      title: "Divine Orders",
      content: "We only have three physical Divine orders left to us by our Lord Jesus Christ: communion, feet-washing, water baptism. That's the only three orders we have."
    },
    {
      title: "The Body as Temple",
      content: "We believe that the Christian's body is the temple of the Holy Ghost (1 Cor. 6:19, 20), that God owns the body of the Christian, and that God judges the Christian according to how he or she treats God property!"
    },
    {
      title: "Missionary Evangelism",
      content: "We propagate a world-wide program of missionary evangelism in accordance with the New Testament principles, methods, and doctrine."
    },
    {
      title: "Tithes and Offerings",
      content: "Both the TITHES and OFFERINGS need to be given in one's congregation or church where they attend, and wait for God's blessings."
    },
    {
      title: "Second Coming",
      content: "We believe the only hope for this world as a whole is the Second Coming of Jesus Christ."
    },
    {
      title: "Gifts and Callings",
      content: "We believe that the Scripture teaches that gifts and callings are without repentance, that when we are born in this world, we are sent here by one purpose, that is, of God."
    },
    {
      title: "Holy Spirit Baptism",
      content: "We emphasize the importance of receiving the baptism of the Holy Spirit by all members of the church, as this is the key revelation that every member must have in their life and they must receive it."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Beliefs</h1>
          <p className="text-lg text-gray-600">Our Fundamental Truths based on the End Time Message</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">Foundation of Faith</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed text-center">
              Our Fundamental Truths are based on the teachings of the Prophet Reverend William Marion Branham. 
              As Christians, we believe that there is no other Foundation that is laid whereby you can get to 
              heaven on, but the Foundation of the Lord Jesus Christ. This statement of Fundamental Truths is 
              intended as a basis of fellowship among us (i.e. that we all speak the same thing, 1 Corinthians 1:10; Acts 2:42).
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {beliefs.map((belief, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">• {belief.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{belief.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">Unity in Belief</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed text-center">
              These beliefs unite us as one people, called out by God's Word for this hour. We stand 
              together on these fundamental truths, knowing that they have been confirmed by the 
              vindicated prophet of God for this generation. Through these beliefs, we maintain 
              fellowship with all Message believers worldwide who hold to these same precious truths.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Beliefs;
