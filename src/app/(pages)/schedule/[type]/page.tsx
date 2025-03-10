'use client';

import { useParams } from 'next/navigation';
import { capitalize } from 'lodash';

import { indicatorColors } from '@/utils';
import { Task } from '@/components';

export default function Page() {
  /**
   * routes
   */
  const { type } = useParams<{ type: string }>();

  return (
    <div>
      <Task.List.Header
        showAdd
        indicator_color={(indicatorColors as any)?.[type]}
        title={capitalize(`${type} Tasks`)}
      />
    </div>
  );
}
