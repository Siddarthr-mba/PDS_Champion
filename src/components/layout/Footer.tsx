import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-[#1e3461]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/prepvector-logo.jpeg" alt="PrepVector" className="h-7 w-auto brightness-0 invert" />
        </Link>
        <p className="text-xs font-medium text-white/60">
          PDS Champion · Product Data Science interview prep
        </p>
        <p className="text-xs text-white/40">© {new Date().getFullYear()} PrepVector</p>
      </div>
    </footer>
  );
}
