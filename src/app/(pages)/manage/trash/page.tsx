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
  const { getAllTasksService, updateTaskService } = useStore();
  const tasks = getAllTasksService().filter((item) => item.isTrashed);

  /**
   * layout
   */
  const { layout, setLayout } = useLayout();

  return (
    <div className="space-y-10">
      <Task.List.Header showAdd Icon={TrashSimple} showPriorityFilter={false} title={'Trash'} />

      <div>
        {tasks?.map((task, index) => (
          <Task.List.Item
            key={index}
            onClick={() => {
              setLayout((layout) => ({ ...layout, task_id: task.id }));
            }}
            onCheck={(checked) => {
              updateTaskService(task.id, { isTrashed: false });
            }}
            {...task}
          />
        ))}

        <Task.List.Empty title="Nothing in trash" action={{}} />
      </div>
    </div>
  );
}
