
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music, Calendar, Upload, Plus, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getDayName, formatTime, formatDuration } from "@/utils/dateHelpers";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  is_published: boolean;
  created_at: string;
  date_recorded: string;
  music_categories?: {
    title: string;
  };
}

interface PracticeSchedule {
  id: string;
  day_of_week: number;
  time: string;
  group_name: string;
  location: string;
  duration_minutes: number;
  is_active: boolean;
}

const MusicDirectorDashboard = () => {
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [practiceSchedules, setPracticeSchedules] = useState<PracticeSchedule[]>([]);
  const [musicEvents, setMusicEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMusicData();
  }, []);

  const fetchMusicData = async () => {
    try {
      setLoading(true);

      // Fetch music tracks
      const { data: tracks, error: tracksError } = await supabase
        .from('music_tracks')
        .select(`
          id,
          title,
          artist,
          duration,
          is_published,
          created_at,
          date_recorded,
          music_categories(title)
        `)
        .order('created_at', { ascending: false });

      if (tracksError) throw tracksError;
      setMusicTracks(tracks || []);

      // Fetch practice schedules
      const { data: schedules, error: schedulesError } = await supabase
        .from('practice_schedules')
        .select('*')
        .order('day_of_week');

      if (schedulesError) throw schedulesError;
      setPracticeSchedules(schedules || []);

      // Fetch music events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('event_type', 'music')
        .order('event_date', { ascending: true });

      if (eventsError) throw eventsError;
      setMusicEvents(events || []);

    } catch (error) {
      console.error('Error fetching music data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const publishedTracks = musicTracks.filter(track => track.is_published);
  const upcomingEvents = musicEvents.filter((event: any) => new Date(event.event_date) > new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B4513]">Music Director Dashboard</h1>
          <p className="text-gray-600">Leading worship through music and song</p>
        </div>
        <Badge variant="outline" className="bg-[#8B4513] text-white">
          Music Director Access
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Music Tracks</CardTitle>
            <Music className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{musicTracks.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{practiceSchedules.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Play className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{publishedTracks.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#8B4513]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-[#8B4513]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B4513]">{upcomingEvents.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="music">Music Library</TabsTrigger>
          <TabsTrigger value="schedules">Practice Schedule</TabsTrigger>
          <TabsTrigger value="upload">Upload Music</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Recent Music</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {musicTracks.slice(0, 5).map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{track.title}</p>
                        <p className="text-sm text-gray-500">{track.artist}</p>
                        <Badge variant="outline" className={track.is_published ? 'text-green-600' : 'text-orange-600'}>
                          {track.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {musicTracks.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No music tracks yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2 bg-[#8B4513] hover:bg-[#A0522D]">
                    <Upload className="w-6 h-6" />
                    <span>Upload Music</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <Plus className="w-6 h-6" />
                    <span>Add Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <Music className="w-6 h-6" />
                    <span>Manage Library</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 border-[#8B4513]">
                    <Calendar className="w-6 h-6" />
                    <span>View Calendar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="music" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#8B4513]">Music Library</CardTitle>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Music
              </Button>
            </CardHeader>
            <CardContent>
              {musicTracks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Artist</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {musicTracks.map((track) => (
                      <TableRow key={track.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{track.title}</p>
                            <p className="text-sm text-gray-600">{track.music_categories?.title}</p>
                          </div>
                        </TableCell>
                        <TableCell>{track.artist || '-'}</TableCell>
                        <TableCell>
                          {track.duration ? formatDuration(track.duration) : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={track.is_published ? 'text-green-600' : 'text-orange-600'}>
                            {track.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {track.date_recorded ? new Date(track.date_recorded).toLocaleDateString() : 
                           new Date(track.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No music tracks uploaded yet</p>
                  <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Track
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#8B4513]">Practice Schedules</CardTitle>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
            </CardHeader>
            <CardContent>
              {practiceSchedules.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {practiceSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.group_name}</TableCell>
                        <TableCell>{getDayName(schedule.day_of_week)}</TableCell>
                        <TableCell>{formatTime(schedule.time)}</TableCell>
                        <TableCell>{schedule.location || '-'}</TableCell>
                        <TableCell>{schedule.duration_minutes} min</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={schedule.is_active ? 'text-green-600' : 'text-red-600'}>
                            {schedule.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="border-[#8B4513]">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No practice schedules set up yet</p>
                  <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Schedule
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Upload New Music</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-[#8B4513] rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
                  <p className="text-lg font-medium text-[#8B4513] mb-2">Upload Music Files</p>
                  <p className="text-gray-600 mb-4">Drag and drop your music files here, or click to browse</p>
                  <Button className="bg-[#8B4513] hover:bg-[#A0522D]">Choose Files</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicDirectorDashboard;
