import { CaretDown } from '@phosphor-icons/react';
import { ButtonHTMLAttributes } from 'react';
import { Dropdown } from '@restart/ui';
import clsx from 'clsx';

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: any;
  withIcon?: boolean;
  [x: string]: unknown;
}

export const Toggle = ({
  children,
  withIcon,
  className,
  as: Component = 'button',
  ...rest
}: ToggleProps) => {
  return (
    <Dropdown.Toggle>
      {(props) => {
        return (
          <Component
            className={clsx(className, 'flex items-center', withIcon && 'gap-2')}
            {...rest}
            {...props}
          >
            {withIcon ? (
              <>
                {children}
                <CaretDown size={20} />
              </>
            ) : (
              children
            )}
          </Component>
        );
      }}
    </Dropdown.Toggle>
  );
};

export default Toggle;
