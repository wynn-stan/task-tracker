import DropdownItem, { DropdownItemProps } from '@restart/ui/DropdownItem';
import clsx from 'clsx';

export default function Item({ active, children, className, ...props }: DropdownItemProps) {
  return (
    <DropdownItem
      className={clsx(
        'hover:bg-neutral-100 transition',
        'flex text-left items-center text-sm px-4 py-3',
        active && 'bg-neutral-100',
        className
      )}
      {...props}
    >
      {children}
    </DropdownItem>
  );
}
