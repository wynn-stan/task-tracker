import { Inter as InterFont } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import 'flatpickr/dist/themes/airbnb.css';
import './globals.scss';

import AppProvider from '../providers/app';

const Inter = InterFont({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Task-It',
  description: 'A minimalist task tracker web-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Inter.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
