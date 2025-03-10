export interface LayoutProps {
  task_id?: string;
  section?: string;
}

import React, { createContext, useState } from 'react';

export const LayoutContext = createContext<{
  layout: Partial<LayoutProps>;
  setLayout: React.Dispatch<React.SetStateAction<Partial<LayoutProps>>>;
}>({
  layout: {},
  setLayout: () => null,
});

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  /**
   * state
   */
  const [layout, setLayout] = useState<Partial<LayoutProps>>({});

  return <LayoutContext.Provider value={{ layout, setLayout }}>{children}</LayoutContext.Provider>;
}
