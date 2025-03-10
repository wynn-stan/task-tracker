import { ChatCircle, Clock, TextIndent } from '@phosphor-icons/react';

import { useLayout, useStore } from '@/hooks';
import DotIndicator from '../Utils/DotIndicator';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import clsx from 'clsx';
import Form from '../Form';

export default function Header() {
  /**
   * layout
   */
  const { layout, setLayout } = useLayout();

  /**
   * store
   */
  const { getTaskService } = useStore();

  /**
   * variables
   */
  const task = getTaskService(layout?.task_id || '');
  const dateFormat = useMemo(() => {
    if (task?.due_on) {
      if (dayjs(task?.due_on).diff(dayjs(), 'd') > 4) return 'DD MMM';
      return 'dddd';
    }
    return '';
  }, [task]);

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex-grow">
        <button onClick={() => setLayout((layout) => ({ ...layout, task_id: undefined }))}>
          <TextIndent size={20} />
        </button>
        <div>{task?.title}</div>

        <div className="flex gap-4 mt-3 text-gray-500">
          {Boolean(task?.comments?.length) && (
            <div className="flex items-center gap-1">
              <ChatCircle size={14} weight="bold" />
              <small className="">{task?.comments?.length}</small>
            </div>
          )}

          {task?.due_on && (
            <div className="flex items-center gap-1">
              <Clock size={14} weight="bold" />
              <small className="">{dayjs(task?.due_on).format(dateFormat)}</small>
            </div>
          )}

          {task?.priority && (
            <div
              className={clsx(
                'flex items-center gap-1 px-1.5 h-5',
                'bg-white border rounded-md border-gray-300'
              )}
            >
              <DotIndicator priority={task.priority} />
              <small className="font-medium text-gray-800 smaller">{task.priority}</small>
            </div>
          )}
        </div>

        {task?.description && (
          <small className="text-gray-600 w-full mt-2">{task.description}</small>
        )}
      </div>
      {/* <Form.Comment /> */}
      <div className="">
        <Form.Comment.Input />
      </div>
    </div>
  );
}
