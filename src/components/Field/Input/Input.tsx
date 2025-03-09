import { forwardRef } from 'react';
import { Field, FastField, FieldAttributes } from 'formik';
import clsx from 'clsx';

export interface InputProps extends FieldAttributes<any> {
  withFormik?: boolean;
  className?: string;
  fast?: boolean;
  name?: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ fast, className, withFormik = true, ...props }, ref) => {
    /**
     * variables
     */
    const Component = withFormik ? (fast ? FastField : Field) : 'input';

    return (
      <Component
        ref={ref}
        className={clsx(
          'placeholder:text-gray-200',
          `outline-none py-3 px-4 border border-gray-10 w-full ${className}`
        )}
        {...props}
      />
    );
  }
);

export default Input;
