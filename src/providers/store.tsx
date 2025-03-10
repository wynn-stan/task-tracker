import React, { createContext, useState } from 'react';

import { TaskModel } from '@/models/task';

export interface StoreProps {
  tasks: TaskModel[];
}

export const StoreContext = createContext<{
  store: Partial<StoreProps>;
  setStore: (value: TaskModel[]) => void;
}>({
  store: { tasks: [] },
  setStore: () => null,
});

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  /**
   * state
   */
  const [store, setStore] = useState<Partial<StoreProps>>(() => {
    if (typeof window !== 'undefined') {
      const storage = window.localStorage;
      try {
        return { tasks: JSON.parse(storage.getItem('tasks') || '') };
      } catch {
        return { tasks: [] };
      }
    }
    return { tasks: [] };
  });

  /**
   * function
   */
  const updateStores = (value: TaskModel[]) => {
    const storage = window?.localStorage;
    storage?.setItem('tasks', JSON.stringify(value));
    setStore({ tasks: value });
  };

  return (
    <StoreContext.Provider value={{ store, setStore: updateStores }}>
      {children}
    </StoreContext.Provider>
  );
}
