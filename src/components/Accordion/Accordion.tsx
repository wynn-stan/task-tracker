import { HtmlHTMLAttributes, useMemo } from 'react';
import { useUncontrolled } from 'uncontrollable';
import clsx from 'clsx';

import AccordionContext, { AccordionContextProps } from './Components/AccordionContext'; // prettier-ignore

import Header from './Components/Header';
import Body from './Components/Body';
import Item from './Components/Item';

export interface AccordionProps
  extends AccordionContextProps,
    Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onSelect'> {}

export function Accordion(props: AccordionProps) {
  const { children, onSelect, activeKey, defaultActiveKey, className, ...controlledProps } =
    useUncontrolled(props, { activeKey: 'onSelect' });
  /**
   * memo
   */
  const contextValue = useMemo(
    () => ({ defaultActiveKey, onSelect, activeKey }),
    [defaultActiveKey, onSelect, activeKey]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={clsx('accordion', className)} {...controlledProps}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export default Object.assign(Accordion, { Item, Header, Body });
