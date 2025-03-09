import { Spinner } from '@phosphor-icons/react';
import clsx from 'clsx';
import { ButtonHTMLAttributes, RefObject } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement>;
  isSubmitting?: boolean;
  contentClassName?: string;
}

export function Button({
  ref,
  children,
  disabled,
  className,
  isSubmitting,
  contentClassName,
  ...props
}: ButtonProps) {
  /**
   * variables
   */
  disabled = isSubmitting || disabled;

  return (
    <button ref={ref} className={clsx('btn', className)} {...{ disabled, ...props }}>
      {isSubmitting ? (
        <span>
          <Spinner size={20} />
        </span>
      ) : (
        ''
      )}
      <span className={clsx(contentClassName, 'flex items-center justify-center gap-2')}>
        {children}
      </span>
    </button>
  );
}

export default Button;
