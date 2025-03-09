import { HtmlHTMLAttributes, useContext, useMemo } from 'react';

import ItemContext, { ItemContextProps } from './ItemContext';
import AccordionContext from './AccordionContext';
import clsx from 'clsx';

export interface ItemProps extends ItemContextProps, HtmlHTMLAttributes<HTMLDivElement> {}

function Item({ eventKey, children, className, ...props }: ItemProps) {
  /**
   * memo
   */
  const contextValue = useMemo(() => ({ eventKey }), [eventKey]);

  /**
   * context
   */
  const { activeKey } = useContext(AccordionContext);

  /**
   * variables
   */
  const active = Array.isArray(activeKey) ? activeKey.includes(eventKey) : activeKey === eventKey;

  return (
    <ItemContext.Provider value={contextValue}>
      <div className={clsx('accordion__item', active && 'active', className)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

export default Item;
