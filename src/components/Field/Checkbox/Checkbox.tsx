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
    <label className={clsx(className, 'inline-flex items-start gap-4 relative cursor-pointer')}>
      <Input
        {...props}
        type="checkbox"
        checked={isChecked}
        className={clsx(inputClassName, 'sr-only peer cursor-pointer')}
      />
      <div
        className={clsx(
          'w-5 h-5 flex-[0_0_1.25rem]',
          'flex rounded-sm border-2 transition border-gray',
          'peer-checked:bg-green peer-checked:border-green'
        )}
      >
        <Check
          className={clsx(
            'w-4 h-4 m-auto stroke-[3px]',
            isChecked ? 'bg-black text-white' : 'text-transparent'
          )}
        />
      </div>
      <div className="select-none text-sm">{children}</div>
    </label>
  );
}

export default Checkbox;
