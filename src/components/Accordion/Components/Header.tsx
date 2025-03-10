import { HtmlHTMLAttributes, useCallback, useContext } from 'react';
import { CaretDown, CaretRight } from '@phosphor-icons/react';

import AccordionContext from './AccordionContext';
import ItemContext from './ItemContext';
import clsx from 'clsx';

export interface HeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  icon?: 'right' | 'left' | 'hidden';
}

function Header({ className, children, icon = 'left', ...props }: HeaderProps) {
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
      className={clsx('accordion__header', className)}
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
      <CaretRight
        size={16}
        className={clsx('transition-all text-gray-400', active && 'rotate-90')}
      />
    </span>
  );
}

export default Header;
