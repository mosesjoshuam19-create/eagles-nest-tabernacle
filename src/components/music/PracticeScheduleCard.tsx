
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getDayName, formatTime } from "@/utils/dateHelpers";

interface PracticeSchedule {
  id: string;
  day_of_week: number;
  time: string;
  group_name: string;
  location: string;
  duration_minutes: number;
}

interface PracticeScheduleCardProps {
  schedules: PracticeSchedule[];
}

const PracticeScheduleCard = ({ schedules }: PracticeScheduleCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span>Practice Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {schedules.length > 0 ? (
          <div className="space-y-4">
            {schedules.map((practice) => (
              <div key={practice.id} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg border border-accent/30">
                <div>
                  <p className="font-medium">{practice.group_name}</p>
                  <p className="text-sm text-muted-foreground">{practice.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{getDayName(practice.day_of_week)}</p>
                  <p className="text-sm text-muted-foreground">{formatTime(practice.time)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">No practice schedules available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeScheduleCard;
