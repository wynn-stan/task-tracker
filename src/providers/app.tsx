'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import relativeTime from 'dayjs/plugin/relativeTime';
import { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';

import { RootNavigation } from '@/components';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  /**
   * Dayjs
   */
  dayjs.extend(relativeTime);

  return (
    <>
      <RootNavigation>{children}</RootNavigation>
      {/* <Toaster /> */}
      <ProgressBar color="#0074D8" height="4px" options={{ showSpinner: false }} shallowRouting />
    </>
  );
}
