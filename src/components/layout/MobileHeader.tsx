import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
      <Link
        to="/"
        className="flex items-center"
        aria-label="PolicyPulse Dashboard"
      >
        <img
          src="/vert-logo.png"
          alt="PolicyPulse"
          className="h-10 w-auto object-contain"
        />
      </Link>

      <Link
        to="/settings"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
        aria-label="Settings"
      >
        <Settings size={21} />
      </Link>
    </header>
  );
};

export default MobileHeader;
