
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MusicOpportunity {
  id: string;
  title: string;
  description: string;
  requirements: string;
  contact_info: string;
}

interface MusicOpportunitiesCardProps {
  opportunities: MusicOpportunity[];
}

const MusicOpportunitiesCard = ({ opportunities }: MusicOpportunitiesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Join Our Music Ministry</CardTitle>
      </CardHeader>
      <CardContent>
        {opportunities.length > 0 ? (
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 border border-accent/30 rounded-lg bg-accent/10">
                <h3 className="font-semibold text-primary mb-2">{opportunity.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
                {opportunity.requirements && (
                  <p className="text-xs text-muted-foreground mb-3">Requirements: {opportunity.requirements}</p>
                )}
                <Button variant="outline" className="w-full">
                  {opportunity.contact_info ? 'Contact Us' : 'Learn More'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border border-accent/30 rounded-lg bg-accent/10">
              <h3 className="font-semibold text-primary mb-2">Music Ministry</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Join our music ministry and worship through song. Contact our music director for more information.
              </p>
              <Button variant="outline" className="w-full">Contact Music Director</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicOpportunitiesCard;
