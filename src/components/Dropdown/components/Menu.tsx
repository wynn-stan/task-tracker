import { UseDropdownMenuOptions, useDropdownMenu } from '@restart/ui';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import clsx from 'clsx';

export interface MenuProps extends UseDropdownMenuOptions {
  className?: string;
  role?: string;
  children?: React.ReactNode;
}

export const Menu = ({ role, className, children, ...rest }: MenuProps) => {
  const [props, { show, popper }] = useDropdownMenu({
    flip: true,
    fixed: true,
    offset: [0, 8],
    placement: 'bottom-start',
    ...rest,
  });

  useIsomorphicEffect(() => {
    if (show) popper?.update();
  }, [show]);

  return (
    <div
      {...props}
      role={role}
      className={clsx(
        'bg-white flex-col rounded-md',
        'shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)] !bg-white !z-[5] py-1',
        'flex overflow-auto min-w-[200px] border-lg',
        show ? '!flex' : '!hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
