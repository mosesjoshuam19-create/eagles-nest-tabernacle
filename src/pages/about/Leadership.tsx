import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BrandPlaceholder from "@/components/BrandPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

type Leader = {
  id: string;
  name: string;
  position: string;
  category: string;
  description: string | null;
  biography: string;
  responsibility: string | null;
  image_url: string | null;
};

const categoryLabels: Record<string, string> = {
  pastor: "Pastor",
  deacons: "Deacons",
  trustees: "Trustees",
  ministers: "Ministers",
};

const Leadership = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaders = async () => {
      const { data, error } = await supabase
        .from("leaders")
        .select("id, name, position, category, description, biography, responsibility, image_url")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (error) {
        console.error("Error loading leadership:", error);
      } else {
        setLeaders((data || []) as Leader[]);
      }
      setLoading(false);
    };

    loadLeaders();
  }, []);

  const groupedLeaders = Object.entries(
    leaders.reduce<Record<string, Leader[]>>((groups, leader) => {
      (groups[leader.category] ||= []).push(leader);
      return groups;
    }, {}),
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Leadership</h1>
          <p className="text-lg text-gray-600">Meet our pastors, ministers, deacons, and trustees</p>
        </div>

        {loading && <p className="py-12 text-center text-gray-500">Loading leadership...</p>}
        {!loading && leaders.length === 0 && (
          <Card className="mx-auto max-w-xl">
            <CardContent className="py-12 text-center text-gray-500">
              Leadership information will be published here soon.
            </CardContent>
          </Card>
        )}

        {groupedLeaders.map(([category, categoryLeaders]) => (
          <section key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-blue-900">
              {categoryLabels[category] || category}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryLeaders.map((leader) => (
                <Card
                  key={leader.id}
                  className="cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => setSelectedLeader(leader)}
                >
                  <CardHeader>
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                        {leader.image_url ? (
                          <img src={leader.image_url} alt={leader.name} className="h-full w-full object-cover" />
                        ) : (
                          <BrandPlaceholder className="h-full w-full rounded-none" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{leader.name}</CardTitle>
                      <p className="font-medium text-blue-600">{leader.position}</p>
                      {leader.description && <p className="text-sm text-gray-600">{leader.description}</p>}
                      {leader.responsibility && (
                        <p className="text-sm text-gray-600">Responsible for {leader.responsibility}</p>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-blue-900">{selectedLeader?.name}</DialogTitle>
            </DialogHeader>
            {selectedLeader && (
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {selectedLeader.image_url ? (
                    <img src={selectedLeader.image_url} alt={selectedLeader.name} className="h-full w-full object-cover" />
                  ) : (
                    <BrandPlaceholder className="h-full w-full rounded-none" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-blue-600">{selectedLeader.position}</h3>
                  {selectedLeader.responsibility && (
                    <p className="mb-3 text-sm text-gray-600">Responsible for: {selectedLeader.responsibility}</p>
                  )}
                  <p className="leading-relaxed text-gray-700">{selectedLeader.biography}</p>
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
