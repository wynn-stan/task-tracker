import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import SidebarModal from './SidebarModal';

function RootNavigation({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      <Sidebar className="hidden md:block" />
      <div className="flex-grow">{children}</div>

      <Navbar className="md:hidden" />
    </div>
  );
}

export default Object.assign(RootNavigation, { SidebarModal });
