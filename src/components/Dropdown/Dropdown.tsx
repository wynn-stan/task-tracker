import { Dropdown, DropdownProps } from '@restart/ui';
import clsx from 'clsx';

import Toggle from './components/Toggle';
import Menu from './components/Menu';
import Item from './components/Item';

interface DropProps extends DropdownProps {
  className?: string;
}

function Drop({ className, children, ...props }: DropProps) {
  return (
    <Dropdown {...props}>
      <div className={clsx('relative', className)}>{children}</div>
    </Dropdown>
  );
}

export default Object.assign(Drop, { Toggle, Menu, Item });
