
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MusicCategoryCard from "@/components/music/MusicCategoryCard";
import RecentTracksSection from "@/components/music/RecentTracksSection";
import PracticeScheduleCard from "@/components/music/PracticeScheduleCard";
import MusicOpportunitiesCard from "@/components/music/MusicOpportunitiesCard";
import { useMusicData } from "@/hooks/useMusicData";

const Music = () => {
  const {
    musicCategories,
    recentTracks,
    practiceSchedule,
    musicOpportunities,
    loading
  } = useMusicData();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading music content...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Music Ministry</h1>
          <p className="text-lg text-gray-600">Worship through song and praise</p>
        </div>

        {/* Music Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {musicCategories.map((category) => (
            <MusicCategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Recent Music */}
        <RecentTracksSection tracks={recentTracks} />

        {/* Practice Schedule and Ministry Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PracticeScheduleCard schedules={practiceSchedule} />
          <MusicOpportunitiesCard opportunities={musicOpportunities} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Music;
