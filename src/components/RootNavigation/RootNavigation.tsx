import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function RootNavigation({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar className="hidden md:block" />
      <div className="px-5 py-8">{children}</div>

      <Navbar className="md:hidden" />
    </div>
  );
}
