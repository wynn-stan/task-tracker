import EmojiPicker from 'emoji-picker-react';

import { Button, Field } from '@/components';

import Utils from '../../Utils';
import { Form, Formik } from 'formik';

export default function Input() {
  return (
    <div>
      <Utils.UserProfile />
      <Formik
        initialValues={{ content: '' }}
        onSubmit={() => {
          //
        }}
      >
        {({ values, isValid, isSubmitting, setFieldValue }) => (
          <Form>
            <Field.Input name="content" placeholder="Comment..." />
            <div className="flex gap-3 justify-end">
              {/* <Button
                type="button"
                onClick={() => onCancel()}
                className="!rounded-md btn-sm border-gray-200"
              >
                Cancel
              </Button> */}
              <Button
                type="submit"
                disabled={!isValid}
                className="btn-primary btn-sm !rounded-md"
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
