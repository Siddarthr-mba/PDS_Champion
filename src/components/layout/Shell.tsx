import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
