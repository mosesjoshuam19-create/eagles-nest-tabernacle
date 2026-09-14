import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="flex items-center gap-3 group"
        aria-label="Eagle's Nest Tabernacle home"
      >
        <img
          src="/uploads/etmlogo.png"
          alt="Eagle's Nest Tabernacle Logo"
          className="h-11 w-11 rounded-full border border-blue-200 bg-white/80 object-contain shadow-sm md:h-12 md:w-12"
        />
        <div className="leading-none">
          <div className="text-lg font-black tracking-tight text-slate-900">
            Eagle&apos;s Nest
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-800">
            Tabernacle
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
