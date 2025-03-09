import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Trash',
    template: '%s - Task-It',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
