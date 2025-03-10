'use client';

import { Plus } from '@phosphor-icons/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';

import PriorityFilter from '../../Utils/PriorityFilter';
import { Button, Field } from '../../../index';

import { TPriorityFilter } from '@/interfaces';
import { useLayout } from '@/hooks';

interface IForm {
  title: string;
  description?: string;
  priority: TPriorityFilter;
  due_on?: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<any>) => void;
  onCancel: () => void;
  defaultValues?: IForm;
}

export default function Add({ onCancel, onSubmit, defaultValues }: Props) {
  /**
   * hooks
   */
  const { layout } = useLayout();

  /**
   * variables
   */
  const defaultPriority =
    defaultValues?.priority || ['high', 'medium', 'low'].includes(layout?.section || '')
      ? layout?.section
      : 'medium';

  return (
    <div className="p-5">
      <Formik
        validateOnMount
        validationSchema={yup.object({
          title: yup.string().required('A title is required'),
        })}
        initialValues={{
          title: '',
          description: '',
          priority: defaultPriority as TPriorityFilter,
          due_on: '',
        }}
        onSubmit={(params, actions) => {
          onSubmit(params, actions);
        }}
      >
        {({ values, errors, isValid, isSubmitting, setFieldValue, handleSubmit }) => (
          <Form className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-3">
                <Field.Input
                  name="title"
                  autoFocus
                  autoComplete="off"
                  className={clsx(
                    'border-0 !px-0 !py-0',
                    'text-[20px] font-bold',
                    'placeholder:text-[20px] placeholder:font-bold placeholder:text-gray-400'
                  )}
                  placeholder="Put down a note"
                />

                <Field.Input
                  autoComplete="off"
                  name="description"
                  rows={2}
                  as="textarea"
                  placeholder="Description"
                  className={clsx(
                    'resize-none',
                    'border-0 px-0 py-0',
                    'text-sm text-gray-800',
                    'placeholder:text-sm placeholder:text-gray-400'
                  )}
                />
              </div>

              <PriorityFilter
                defaultValue="medium"
                filters={['high', 'medium', 'low']}
                onChange={(value) => setFieldValue('priority', value)}
              />
            </div>

            <div className="border border-gray-200 w-full h-[1px]" />

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                onClick={() => onCancel()}
                className="!rounded-md btn-sm border-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                onClick={() => handleSubmit()}
                className="btn-primary btn-sm !rounded-md"
                {...{ isSubmitting }}
              >
                {!isSubmitting && <Plus className="" />}
                <small>Add</small>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
