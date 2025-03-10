'use client';

import { useParams } from 'next/navigation';
import { capitalize } from 'lodash';

import { indicatorColors } from '@/utils';
import { Task } from '@/components';
import { useLayout, useStore } from '@/hooks';
import { useEffect } from 'react';

export default function Page() {
  /**
   * routes
   */
  const { type } = useParams<{ type: string }>();

  /**
   * hooks
   */
  const { layout, setLayout } = useLayout();
  const { getAllTasksService, updateTaskService } = useStore();

  /**
   * variables
   */
  const details = (() => {
    if (type === 'all') return { title: `${type} tasks`, showPriorityFilter: true };
    if (type !== 'completed') return { title: `${type} priority` };
    return { title: `${type}` };
  })();
  const tasks = getAllTasksService().filter((item) => !item.isTrashed);

  /**
   * effect
   */
  useEffect(() => {
    setLayout((layout) => ({ ...layout, section: type }));
  }, [type, setLayout]);

  useEffect(() => {
    return () => {
      setLayout((layout) => ({ ...layout, section: '' }));
    };
  }, []);

  return (
    <div className="space-y-10">
      <Task.List.Header
        showAdd={type !== 'completed'}
        indicator_color={(indicatorColors as any)?.[type]}
        showPriorityFilter={details?.showPriorityFilter}
        title={capitalize(details.title)}
      />

      <div>
        {type === 'all' && (
          <Task.List.Section priorities={['high', 'medium', 'low', 'completed']} />
        )}

        {type !== 'all' && (
          <div className="space-y-4">
            {tasks
              ?.filter((item) => item.priority === type)
              .map((task, index) => (
                <Task.List.Item
                  key={index}
                  onClick={() => {
                    setLayout((layout) => ({ ...layout, task_id: task.id }));
                  }}
                  {...task}
                />
              ))}
          </div>
        )}

        <Task.List.Empty />
      </div>
    </div>
  );
}
