
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Heart, Gift, CreditCard } from "lucide-react";
import { useState } from "react";

const Giving = () => {
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("tithe");

  const quickAmounts = [25, 50, 100, 250, 500];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Online Giving
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Support the ministry and help spread the End Time Message
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    Make a Donation
                  </CardTitle>
                  <CardDescription>
                    Choose your giving type and amount
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={donationType} onValueChange={setDonationType} className="mb-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tithe">Tithe</TabsTrigger>
                      <TabsTrigger value="offering">Offering</TabsTrigger>
                      <TabsTrigger value="special">Special</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tithe" className="mt-4">
                      <p className="text-sm text-gray-600">
                        Both the TITHES and OFFERINGS need to be given in one's congregation or church where they attend, and wait for God's blessings.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="offering" className="mt-4">
                      <p className="text-sm text-gray-600">
                        Your offerings support the general ministry and outreach programs.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="special" className="mt-4">
                      <p className="text-sm text-gray-600">
                        Special offerings for specific projects, missions, or building fund.
                      </p>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Quick Select</Label>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {quickAmounts.map((quickAmount) => (
                          <Button
                            key={quickAmount}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                            className="text-xs"
                          >
                            ${quickAmount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Give ${amount || "0"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-600" />
                    Why We Give
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      Giving is an act of worship and obedience to God's Word. Through your tithes and offerings, you participate in advancing the Kingdom of God and spreading the End Time Message.
                    </p>
                    <p>
                      Your generosity helps support:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Ministry operations and pastoral care</li>
                      <li>Satellite church development</li>
                      <li>Missionary work and outreach</li>
                      <li>Building maintenance and improvements</li>
                      <li>Community programs and assistance</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-6 h-6 text-green-600" />
                    Other Ways to Give
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-600">
                    <div>
                      <h4 className="font-semibold text-gray-900">In-Person</h4>
                      <p className="text-sm">
                        Bring your tithes and offerings during Sunday services or drop them off at the church office.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
                      <p className="text-sm">
                        Contact the church office for bank details and transfer instructions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Mobile Money</h4>
                      <p className="text-sm">
                        Send your contributions via mobile money. Contact us for account details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Giving;
