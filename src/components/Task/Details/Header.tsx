import { ChatCircle, Clock, TextIndent, XCircle } from '@phosphor-icons/react';
import { useLayout, useStore } from '@/hooks';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

import DotIndicator from '../Utils/DotIndicator';
import Form from '../Form';
import { Field } from '@/components';
import Utils from '../Utils';

export default function Header() {
  /**
   * hooks
   */
  const { layout, setLayout } = useLayout();
  const { getTaskService, addCommentService, updateTaskService } = useStore();

  /**
   * state
   */
  const [editDate, setEditDate] = useState(false);

  /**
   * variables
   */
  const task = getTaskService(layout?.task_id || '');
  const dateFormat = useMemo(() => {
    if (task?.due_on) {
      if (dayjs(task?.due_on, 'MM-DD-YYYY').diff(dayjs(), 'd') > 4) return 'DD MMM';
      return 'dddd';
    }
    return '';
  }, [task]);

  const dueType = task?.due_on;

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="">
        <button onClick={() => setLayout((layout) => ({ ...layout, task_id: undefined }))}>
          <TextIndent size={20} />
        </button>

        <div className="flex gap-3">
          {!task?.isTrashed && (
            <>
              <Field.Checkbox
                className="mt-1"
                withFormik={false}
                checked={task?.complete}
                onChange={({ currentTarget: { checked } }) => {
                  if (checked) {
                    updateTaskService(task?.id as string, {
                      complete: checked,
                      priority: 'completed',
                      last_priority: task?.priority,
                    });
                  } else {
                    updateTaskService(task?.id as string, {
                      complete: checked,
                      priority: task?.last_priority || 'low',
                    });
                  }
                }}
              />
            </>
          )}
          <div>{task?.title}</div>
        </div>

        <div className="flex items-center gap-3 mt-3 text-gray-500">
          {Boolean(task?.comments?.length) && (
            <div className="flex items-center gap-1">
              <ChatCircle size={14} weight="bold" />
              <small className="">{task?.comments?.length}</small>
            </div>
          )}

          {task?.due_on && !editDate && (
            <div
              onClick={() => setEditDate(true)}
              className={clsx(
                'flex items-center gap-1 px-1.5 h-7',
                'bg-white border rounded-md border-gray-300'
              )}
            >
              <Clock size={14} weight="bold" />
              <small className="">{dayjs(task.due_on).format(dateFormat)}</small>
              <div
                className="pl-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  updateTaskService(task.id, { due_on: '' });
                }}
              >
                <XCircle className="text-gray-400" size={16} weight="fill" />
              </div>
            </div>
          )}

          {(!task?.due_on || editDate) && (
            <Field.Date
              className={clsx(!task?.due_on ? 'w-10' : 'w-[98px]')}
              onChange={(date) => {
                updateTaskService(task?.id as string, { due_on: date as string });
                setEditDate(false);
              }}
              value={task?.due_on}
            />
          )}

          {task?.priority && (
            <Utils.PriorityFilter
              defaultValue={task.priority}
              filters={['high', 'medium', 'low']}
              onChange={(key) => {
                updateTaskService(task.id, { priority: key });
              }}
              toggleClassName="!text-gray-800"
            />
          )}
        </div>

        {task?.description && (
          <small className="text-gray-600 w-full mt-2">{task.description}</small>
        )}
      </div>

      {/* <Form.Comment /> */}
      <div className="h-full flex gap-5 flex-col justify-between">
        <div className="space-y-5">
          {task?.comments?.map((item, index) => (
            <Form.Comment
              key={index}
              task_id={task.id}
              id={item.id}
              content={item.content}
              last_updated={item.last_updated}
            />
          ))}
        </div>
        {task && (
          <Form.Comment.Input
            onSubmit={(params, actions) => {
              addCommentService(task.id, params);
              actions.resetForm({});
            }}
          />
        )}
      </div>
    </div>
  );
}
