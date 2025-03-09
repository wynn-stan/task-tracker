import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Schedule',
    template: '%s - Task-It',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
