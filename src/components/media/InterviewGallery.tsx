
import InterviewCard from "./InterviewCard";

interface InterviewItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
}

interface InterviewGalleryProps {
  interviews: InterviewItem[];
  onDownload: (interview: InterviewItem) => void;
  formatDuration: (seconds: number) => string;
}

const InterviewGallery = ({ interviews, onDownload, formatDuration }: InterviewGalleryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {interviews.map((interview) => (
        <InterviewCard 
          key={interview.id} 
          interview={interview} 
          onDownload={onDownload}
          formatDuration={formatDuration}
        />
      ))}
    </div>
  );
};

export default InterviewGallery;
