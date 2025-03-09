import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export default function Footer({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('border-t border-gray-100', 'flex justify-end gap-3', 'py-3 px-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}
