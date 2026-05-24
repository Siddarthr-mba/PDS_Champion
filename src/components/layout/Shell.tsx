import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] text-gray-800">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
