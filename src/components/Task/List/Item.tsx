import {
  ArrowCounterClockwise,
  ChatCircle,
  Clock,
  DotsSixVertical,
  DotsThreeVertical,
  TrashSimple,
} from '@phosphor-icons/react';
import { useLayout, useStore } from '@/hooks';
import { CSS } from '@dnd-kit/utilities';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { TPriorityFilter } from '@/interfaces';
import { TaskModel } from '@/models/task';

import DotIndicator from '../Utils/DotIndicator';
import { Field } from '../../index';
import Utils from '../Utils';
import { useSortable } from '@dnd-kit/sortable';

interface Props extends TaskModel {
  onRestore?: () => void;
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
  const { updateTaskService, removeTaskService } = useStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

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
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
      }}
      className={clsx(
        'flex gap-2 p-3',
        'rounded-md bg-gray-50 cursor-pointer',
        isDragging && 'shadow-md'
      )}
      ref={setNodeRef}
    >
      <div className="mt-1 cursor-grab" {...attributes} {...listeners}>
        <DotsSixVertical size={20} />
      </div>

      {!isTrashed && (
        <Field.Checkbox
          className="mt-1"
          withFormik={false}
          checked={Boolean(complete)}
          {...(listeners ? { 'data-no-dnd': true } : {})}
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
          {Boolean(comments?.length) && (
            <div className="flex items-center gap-1">
              <ChatCircle size={14} weight="bold" />
              <small className="">{comments?.length}</small>
            </div>
          )}

          {/* {due_on && (
            <div className="flex items-center gap-1">
              <Clock size={14} weight="bold" />
              <small className="">{dayjs(due_on).format(dateFormat)}</small>
            </div>
          )} */}

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
          {...(listeners ? { 'data-no-dnd': true } : {})}
          onClick={(e) => {
            e.stopPropagation();
            updateTaskService(id, { isTrashed: true });
          }}
        >
          <TrashSimple size={18} className="text-gray-400" />
        </div>
      ) : (
        <div className="flex gap-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              updateTaskService(id, { isTrashed: false });
            }}
          >
            <ArrowCounterClockwise size={18} className="text-gray-400" />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              removeTaskService(id);
            }}
          >
            <TrashSimple size={18} weight="fill" className="text-danger" />
          </div>
        </div>
      )}
    </div>
  );
}
