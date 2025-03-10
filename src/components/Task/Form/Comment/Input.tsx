import EmojiPicker from 'emoji-picker-react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

import { Button, Field } from '@/components';

import Utils from '../../Utils';
import { v4 } from 'uuid';
import dayjs from 'dayjs';

interface IForm {
  id: string;
  content: string;
  last_updated: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<any>) => void;
}

export default function Input({ onSubmit }: Props) {
  return (
    <div className="flex items-start gap-4">
      <Utils.UserProfile className="mt-1" />
      <Formik
        validateOnMount
        validationSchema={yup.object({
          content: yup.string().required('Content is required'),
        })}
        initialValues={{ content: '' }}
        onSubmit={({ content }, actions) => {
          onSubmit(
            {
              content,
              id: v4(),
              last_updated: dayjs().toISOString(),
            },
            actions
          );
        }}
      >
        {({ values, errors, isValid, isSubmitting, setFieldValue }) => (
          <Form className="border border-gray-200 rounded-lg p-3 w-full">
            <Field.Input
              as="textarea"
              rows={2}
              name="content"
              placeholder="Comment..."
              className="resize-none !border-0 text-sm placeholder:text-sm"
            />
            <div className="flex gap-3 justify-end">
              <Button
                type="submit"
                disabled={!isValid}
                className="btn-primary btn-xs !rounded-md"
                {...{ isSubmitting }}
              >
                <small>Comment</small>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
