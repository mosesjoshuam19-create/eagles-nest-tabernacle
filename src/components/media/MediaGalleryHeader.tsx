
interface MediaGalleryHeaderProps {
  title: string;
  subtitle: string;
}

const MediaGalleryHeader = ({ title, subtitle }: MediaGalleryHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-black mb-4">{title}</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default MediaGalleryHeader;
