import EmojiPicker from 'emoji-picker-react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button, Dropdown, Field } from '@/components';

import Utils from '../../Utils';
import { DotsThreeOutline, Pencil, TrashSimple } from '@phosphor-icons/react';
import { CommentModel } from '@/models/task';
import dayjs from 'dayjs';
import { useState } from 'react';
import clsx from 'clsx';
import { useStore } from '@/hooks';

type TStatus = 'view' | 'edit';

export default function Comment({
  content,
  id,
  last_updated,
  task_id,
}: CommentModel & { task_id: string }) {
  /**
   * state
   */
  const [status, setStatus] = useState<TStatus>('view');

  /**
   * hooks
   */
  const { updateTaskCommentService, removeCommentService } = useStore();

  return (
    <div className="flex items-start gap-2">
      <Utils.UserProfile className="mt-1" size={24} />
      {status === 'view' && (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <small className="text-gray-600">Anon245</small>
              <small>-</small>
              <small className="smaller text-gray-400">
                {dayjs(last_updated).format('DD MMMM YYYY')}
              </small>
            </div>
            <small className="text-gray-800">{content}</small>
          </div>

          <div className="flex-grow flex justify-end">
            <Dropdown>
              <Dropdown.Toggle>
                <DotsThreeOutline className="text-gray-400" size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setStatus('edit')}
                  className="text-gray-700 flex justify-between gap-4 py-2"
                >
                  <small>Edit</small>
                  <Pencil size={20} />
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => removeCommentService(task_id, id)}
                  className="text-danger flex justify-between gap-4 py-2"
                >
                  <small>Delete</small>
                  <TrashSimple size={20} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      )}

      {status === 'edit' && (
        <Formik
          validateOnMount
          validationSchema={yup.object({
            content: yup.string().required('Content is required'),
          })}
          initialValues={{ content }}
          onSubmit={(params, actions) => {
            updateTaskCommentService(task_id, id, {
              content: params.content,
              last_updated: dayjs().toISOString(),
            });
            setStatus('view');
          }}
        >
          {({ values, errors, isValid, isSubmitting, setFieldValue }) => (
            <Form className="border border-gray-200 rounded-lg p-3 w-full">
              <Field.Input
                as="textarea"
                rows={3}
                name="content"
                placeholder="Comment..."
                className="resize-none !border-0 text-sm placeholder:text-sm"
              />
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  onClick={() => setStatus('view')}
                  className="!rounded-md btn-xs border-gray-200"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!isValid}
                  className="btn-primary btn-xs !rounded-md"
                  {...{ isSubmitting }}
                >
                  <small>Edit</small>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
