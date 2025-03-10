'use client';

import { Check } from '@phosphor-icons/react';
import { InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import clsx from 'clsx';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  withFormik?: boolean;
  inputClassName?: string;
}

export function Checkbox({
  children,
  className,
  inputClassName,
  withFormik = true,
  checked: isChecked,
  ...props
}: CheckboxProps) {
  /**
   * variables
   */
  const Input = withFormik ? Field : 'input';

  return (
    <label className={clsx(className, 'gap-4 relative cursor-pointer')}>
      <Input
        {...props}
        type="checkbox"
        checked={isChecked}
        className={clsx(inputClassName, 'sr-only peer cursor-pointer')}
      />
      <div
        className={clsx(
          'w-[18px] h-[18px]',
          'flex rounded-md border transition border-gray-200',
          'peer-checked:bg-primary peer-checked:border-0'
        )}
      >
        <Check
          weight="bold"
          size={14}
          className={clsx('m-auto', isChecked ? 'bg-primary text-white' : 'text-transparent')}
        />
      </div>
      <div className="select-none text-sm">{children}</div>
    </label>
  );
}

export default Checkbox;
