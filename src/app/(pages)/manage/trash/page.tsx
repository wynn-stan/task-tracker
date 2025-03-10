'use client';

import { TrashSimple } from '@phosphor-icons/react';
import { useParams } from 'next/navigation';
import { capitalize } from 'lodash';

import { indicatorColors } from '@/utils';
import { Task } from '@/components';
import { useLayout, useStore } from '@/hooks';

export default function Page() {
  /**
   * routes
   */
  const { type } = useParams<{ type: string }>();

  /**
   * store
   */
  const { getAllTasksService, updateTaskService, tasksSummary } = useStore();
  const tasks = getAllTasksService().filter((item) => item.isTrashed);

  /**
   * layout
   */
  const { layout, setLayout } = useLayout();

  return (
    <div className="space-y-5">
      <Task.List.Header Icon={TrashSimple} title={'Trash'} />

      <div className="space-y-3">
        {Boolean(tasksSummary.trashed) ? (
          <>
            {tasks?.map((task, index) => (
              <Task.List.Item
                key={index}
                onClick={() => {
                  setLayout((layout) => ({ ...layout, task_id: task.id }));
                }}
                {...task}
              />
            ))}
          </>
        ) : (
          <Task.List.Empty title="Nothing in trash" action={{}} />
        )}
      </div>
    </div>
  );
}
