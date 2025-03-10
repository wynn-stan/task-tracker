'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { capitalize } from 'lodash';
import clsx from 'clsx';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { TPriorityFilter } from '@/interfaces';
import { useLayout, useStore } from '@/hooks';
import { indicatorColors } from '@/utils';
import { Task } from '@/components';

export default function Page() {
  /**
   * state
   */
  const [filter, setFilter] = useState<TPriorityFilter>('all');

  /**
   * hooks
   */
  const { type } = useParams<{ type: string }>();
  const { layout, setLayout } = useLayout();
  const { getAllTasksService, updateTaskService } = useStore();

  /**
   * variables
   */
  const details = (() => {
    if (type === 'all') return { title: `${type} tasks` };
    if (type !== 'completed') return { title: `${type} priority` };
    return { title: `${type}` };
  })();
  const tasks = getAllTasksService().filter((item) => !item.isTrashed);
  const tasksLength =
    type === 'all' ? tasks?.length : tasks?.filter((item) => item.priority === type).length;

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
    <div className={clsx(type === 'all' ? 'space-y-8' : 'space-y-5')}>
      <Task.List.Header
        showAdd={type !== 'completed'}
        indicator_color={(indicatorColors as any)?.[type]}
        onFilterChange={(key) => {
          setFilter(key);
          setLayout((layout) => ({ ...layout, section: key }));
        }}
        title={capitalize(details.title)}
      />

      <div>
        {type === 'all' && (
          <>
            {Boolean(tasksLength) ? (
              <Task.List.Section
                priorities={filter === 'all' ? ['high', 'medium', 'low', 'completed'] : [filter]}
              />
            ) : (
              <Task.List.Empty />
            )}{' '}
          </>
        )}

        {type !== 'all' && (
          <>
            {Boolean(tasksLength) ? (
              <Task.List.DraggableContext
                tasks={
                  tasks?.filter((item) => item.priority === type)?.map((item) => item.id) || []
                }
              >
                <div className="space-y-4">
                  {tasks
                    ?.filter((item) => item.priority === type)
                    .map((task, index) => (
                      <Task.List.Item
                        key={task.id}
                        onClick={() => {
                          setLayout((layout) => ({ ...layout, task_id: task.id }));
                        }}
                        {...task}
                      />
                    ))}
                </div>
              </Task.List.DraggableContext>
            ) : type !== 'completed' ? (
              <Task.List.Empty />
            ) : (
              <Task.List.Empty title="No completed tasks yet" action={{}} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
