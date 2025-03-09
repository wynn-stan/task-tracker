import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export default function Body({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('border-t border-gray-100', 'px-6 pt-3 pb-6', className)} {...props}>
      {children}
    </div>
  );
}
