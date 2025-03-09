import { HtmlHTMLAttributes, useCallback, useContext } from 'react';
import { CaretDown } from '@phosphor-icons/react';

import AccordionContext from './AccordionContext';
import ItemContext from './ItemContext';
import clsx from 'clsx';

export interface HeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  icon?: 'right' | 'left' | 'hidden';
}

function Header({ className, children, icon = 'right', ...props }: HeaderProps) {
  /**
   * context
   */
  const { activeKey, onSelect } = useContext(AccordionContext);
  const { eventKey } = useContext(ItemContext);

  /**
   * variables
   */
  const active = Array.isArray(activeKey) ? activeKey.includes(eventKey) : activeKey === eventKey;

  /**
   * function
   */
  const handleClick = useCallback(() => {
    let eventKeyPassed = null;

    if (!active) {
      eventKeyPassed = eventKey;
    }

    const isArray = Array.isArray(activeKey);

    onSelect?.(
      eventKeyPassed
        ? isArray
          ? [...activeKey, eventKey]
          : eventKey
        : isArray
        ? activeKey.filter((i) => i !== eventKey)
        : null
    );
  }, [active, eventKey, activeKey, onSelect]);

  return (
    <div
      role="button"
      onClick={() => handleClick()}
      className={clsx(className, 'accordion__header')}
      {...props}
    >
      {icon === 'left' && <Icon {...{ active }} />}
      {children}
      {icon === 'right' && <Icon className="ml-auto" {...{ active }} />}
    </div>
  );
}

function Icon({ active, className }: { active: boolean; className?: string }) {
  return (
    <span className={clsx('toggle', className)}>
      <CaretDown
        size={16}
        weight="bold"
        className={clsx('transition-all', active && 'rotate-180')}
      />
    </span>
  );
}

export default Header;
