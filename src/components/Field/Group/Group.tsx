import { ErrorMessage } from 'formik';
import clsx from 'clsx';

interface Props {
  label: string;
  children: React.ReactNode;
  name: string;
  containerClassName?: string;
  wrapperClassName?: string;
  disabled?: boolean;
}

export default function Group({
  children,
  disabled = false,
  name,
  label,
  containerClassName,
  wrapperClassName,
}: Props) {
  return (
    <div className={clsx('space-y-2', wrapperClassName)}>
      {label && <div className="text-sm font-medium text-gray-40">{label}</div>}
      <div
        className={clsx(
          'flex gap-3',
          disabled ? 'opacity-50 pointer-events-none' : '',
          containerClassName
        )}
      >
        {children}
      </div>
      <div className="text-red-40 text-xs px-3">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}
