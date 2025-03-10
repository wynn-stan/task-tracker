import { LayoutContext } from '@/providers/layout';
import { useContext } from 'react';

export const useLayout = () => {
  /**
   * context
   */
  const { layout, setLayout } = useContext(LayoutContext);

  return { layout, setLayout };
};
