import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { CalendarBlank, CalendarDots, XCircle } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import clsx from 'clsx';

export interface DateProps extends DateTimePickerProps {
  withIcon?: boolean;
  setFieldValue?: (field: string, value: string, shouldValidate?: boolean) => void;
  setFieldTouched?: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  wrapperClassName?: string;
}

export function Date({
  name,
  value,
  options,
  className,
  placeholder,
  onChange,
  withIcon = true,
  wrapperClassName,
  ...props
}: DateProps & {
  onChange: (date: string) => void;
}) {
  return (
    <div
      className={clsx(
        'px-1.5 h-[32px] rounded-md',
        ' border border-gray-300 ',
        'flex justify-center items-center gap-1',
        wrapperClassName
      )}
    >
      {withIcon && (
        <span className="text-gray-600">
          <CalendarDots size={20} />
        </span>
      )}
      <Flatpickr
        value={value ? dayjs(value as string).toDate() : ''}
        className={clsx(
          'text-sm bg-transparent outline-0 outline-none border-0 placeholder:text-gray-600',
          className
        )}
        onChange={(date: any) => {
          onChange(dayjs(date[0]).format('DD/MM/YYYY'));
        }}
        options={{
          altInput: true,
          altFormat: 'j F, Y',
          disableMobile: true,
          dateFormat: 'd / m / Y',
          ...options,
        }}
        placeholder={placeholder || 'Date'}
        {...props}
      />
      {value && (
        <div className="cursor-pointer" onClick={() => onChange('')}>
          <XCircle className="text-gray-400" size={20} weight="fill" />
        </div>
      )}
    </div>
  );
}

export default Date;
