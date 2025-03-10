import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMemo } from 'react';
import Image from 'next/image';

export default function UserProfile({ size }: { size?: number }) {
  /**
   * memo
   */
  const profileUrl = useMemo(() => {
    return createAvatar(initials, { size: 32, seed: 'Anon245' }).toDataUri();
  }, []);
  return (
    <Image
      alt="profile"
      className="bg-cover bg-center rounded-md"
      width={size || 32}
      height={size || 32}
      src={profileUrl}
    />
  );
}
