import { ArrowCounterClockwise, ChatCircle, Clock, TrashSimple } from '@phosphor-icons/react';
import { useLayout, useStore } from '@/hooks';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { TPriorityFilter } from '@/interfaces';
import { TaskModel } from '@/models/task';

import DotIndicator from '../Utils/DotIndicator';
import { Field } from '../../index';

interface Props extends TaskModel {
  onCheck?: (checked: boolean) => void;
  onClick: () => void;
}

export default function Item({
  onCheck,
  comments,
  complete,
  description,
  due_on,
  priority,
  title,
  id,
  isTrashed,
  onClick,
  last_priority,
}: Props) {
  /**
   * hooks
   */
  const { updateTaskService } = useStore();

  /**
   * variables
   */
  const dateFormat = (() => {
    if (due_on) {
      if (dayjs(due_on).diff(dayjs(), 'd') > 4) return 'DD MMM';
      return 'dddd';
    }
    return '';
  })();
  return (
    <div
      onClick={onClick}
      role="button"
      className={clsx('flex gap-3 p-3', 'rounded-md bg-gray-50')}
    >
      {!isTrashed && (
        <Field.Checkbox
          className="mt-1"
          withFormik={false}
          checked={complete}
          onChange={({ stopPropagation, currentTarget: { checked } }) => {
            stopPropagation();
            if (onCheck) {
              onCheck(checked);
            } else {
              if (checked) {
                updateTaskService(id, {
                  complete: checked,
                  priority: 'completed',
                  last_priority: priority,
                });
              } else {
                updateTaskService(id, {
                  complete: checked,
                  priority: last_priority || 'low',
                });
              }
            }
          }}
        />
      )}

      <div className="flex-grow">
        <small className="font-medium line-clamp-1">{title}</small>
        {description && (
          <small className="text-gray-600 w-full line-clamp-1 mt-2">{description}</small>
        )}

        <div className="flex gap-4 mt-3 text-gray-500">
          {comments && (
            <div className="flex items-center gap-1">
              <ChatCircle size={14} weight="bold" />
              <small className="">{comments.length}</small>
            </div>
          )}

          {due_on && (
            <div className="flex items-center gap-1">
              <Clock size={14} weight="bold" />
              <small className="">{dayjs(due_on).format(dateFormat)}</small>
            </div>
          )}

          {priority && (
            <div
              className={clsx(
                'flex items-center gap-1 px-1.5 h-5',
                'bg-white border rounded-md border-gray-300'
              )}
            >
              <DotIndicator priority={priority} />
              <small className="font-medium text-gray-800 smaller">{priority}</small>
            </div>
          )}
        </div>
      </div>

      {!isTrashed ? (
        <div
          onClick={() => {
            updateTaskService(id, { isTrashed: true });
          }}
        >
          <TrashSimple size={18} className="text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => {
            updateTaskService(id, { isTrashed: false });
          }}
        >
          <ArrowCounterClockwise size={18} className="text-gray-400" />
        </div>
      )}
    </div>
  );
}
