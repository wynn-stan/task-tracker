import { HtmlHTMLAttributes, useContext } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import AccordionContext from './AccordionContext';
import ItemContext from './ItemContext';
import clsx from 'clsx';

export interface BodyProps
  extends Omit<
    HtmlHTMLAttributes<HTMLDivElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  contentClassName?: string;
}

function Body({ className, children, contentClassName, ...props }: BodyProps) {
  /**
   * context
   */
  const { activeKey } = useContext(AccordionContext);
  const { eventKey } = useContext(ItemContext);

  /**
   * variables
   */
  const active = Array.isArray(activeKey) ? activeKey.includes(eventKey) : activeKey === eventKey;

  return (
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          exit="hidden"
          animate="show"
          initial="hidden"
          transition={{ type: 'just' }}
          className={clsx('accordion__body', className)}
          variants={{
            hidden: {
              height: 0,
            },
            show: {
              height: 'auto',
            },
          }}
          {...props}
        >
          <div className={clsx('accordion__body__content', contentClassName)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Body;
