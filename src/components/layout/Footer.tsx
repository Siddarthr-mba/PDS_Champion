import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#aa3bff] text-xs font-black text-white">
            P
          </span>
          PDS Champion
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Product Data Science interview prep — practice makes permanent.
        </p>
      </div>
    </footer>
  );
}
