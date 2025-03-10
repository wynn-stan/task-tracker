import { forwardRef } from 'react';
import { Field, FastField, FieldAttributes } from 'formik';
import clsx from 'clsx';

export interface InputProps {
  withFormik?: boolean;
  placeholder?: string;
  className?: string;
  fast?: boolean;
  name?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

const Input = ({
  fast,
  ref,
  className,
  withFormik = true,
  ...props
}: FieldAttributes<any> & InputProps) => {
  /**
   * variables
   */
  const Component = withFormik ? (fast ? FastField : Field) : 'input';

  return (
    <Component
      ref={ref}
      className={clsx(
        'placeholder:text-gray-200',
        `outline-none border border-gray-10 w-full ${className}`
      )}
      {...props}
    />
  );
};

export default Input;
