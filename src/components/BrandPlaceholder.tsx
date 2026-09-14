interface BrandPlaceholderProps {
  alt?: string;
  className?: string;
}

const BrandPlaceholder = ({
  alt = "Eagle's Nest Tabernacle logo",
  className = "h-full w-full object-contain",
}: BrandPlaceholderProps) => (
  <img src="/uploads/etmlogo.png" alt={alt} className={className} />
);

export default BrandPlaceholder;
