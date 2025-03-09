'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  /**
   * routes
   */
  const { type } = useParams<{ type: string }>();

  return <div>Welcome to {type}</div>;
}
