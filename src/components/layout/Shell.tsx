import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ShellProps {
  children: ReactNode;
  hero?: ReactNode;
}

export default function Shell({ children, hero }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] text-gray-800">
      <Navbar />
      {hero && (
        <div className="w-full bg-[#1e3461] py-12 text-center">
          {hero}
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
