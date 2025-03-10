import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { CalendarBlank } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import clsx from 'clsx';

export interface DateProps extends DateTimePickerProps {
  withIcon?: boolean;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
  setFieldTouched?: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
}

export function Date({
  name,
  value,
  options,
  className,
  placeholder,
  setFieldValue,
  setFieldTouched,
  withIcon = true,
  ...props
}: DateProps) {
  return (
    <>
      <Flatpickr
        value={value ? dayjs(value as string).toDate() : ''}
        className={clsx(className, 'field-input')}
        onChange={(date: any) => {
          setFieldValue(String(name), dayjs(date[0]).format('YYYY-MM-DD'));
          setTimeout(() => setFieldTouched?.(String(name), true));
        }}
        options={{
          disableMobile: true,
          dateFormat: 'd / m / Y',
          ...options,
        }}
        placeholder={placeholder || 'dd/mm/yyyy'}
        {...props}
      />
      {withIcon && (
        <span className="pr-3 text-grey-80">
          <CalendarBlank size={24} weight="bold" />
        </span>
      )}
    </>
  );
}

export default Date;
