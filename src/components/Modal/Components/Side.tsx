import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from '@phosphor-icons/react';
import * as Restart from '@restart/ui';
import clsx from 'clsx';

export interface SideProps {
  show?: boolean;
  title?: string;
  onHide?: () => void;
  direction?: 'left' | 'right';
  children: ReactNode;
  containerClassName?: string;
}

export function Side({
  show,
  title,
  onHide,
  children,
  direction = 'right',
  containerClassName,
}: SideProps) {
  /**
   * variables
   */
  const val = direction === 'left' ? -1 : 1;

  /**
   * state
   */
  const [showModal, setShowModal] = useState(false);

  /**
   * effect
   */
  useEffect(() => {
    if (show) {
      setShowModal(true);
    }

    if (!show) {
      setTimeout(() => setShowModal(false), 300);
    }
  }, [show]);

  return (
    <Restart.Modal
      show={showModal}
      enforceFocus={false}
      aria-labelledby="modal"
      className="h-full fixed z-[1005]"
    >
      <AnimatePresence mode="wait" key={`${String(showModal)}-presence`}>
        <motion.div
          key={`${String(showModal)}-content`}
          exit="closed"
          animate={show ? 'open' : 'closed'}
          initial="closed"
          variants={{
            closed: { x: 480 * val },
            open: { x: 0 },
          }}
          transition={{ type: 'tween' }}
          className={clsx(
            'bg-white',
            'h-full w-fit',
            'fixed top-0 overflow-y-auto z-[1050]',
            direction === 'left' ? 'left-0' : 'right-0',
            containerClassName
          )}
        >
          {title && (
            <div
              className={clsx(
                'px-6 py-5',
                'sticky top-0 bg-white z-10',
                'flex items-center justify-between'
              )}
            >
              <p className="text-lg font-medium leading-6">{title}</p>
              <button className="text-gray p-0.5" onClick={() => onHide?.()}>
                <X size={20} />
              </button>
            </div>
          )}

          <div className={clsx(title ? 'h-[calc(100%-64px)]' : 'h-full', 'flex flex-col relative')}>
            {children}
          </div>
        </motion.div>

        <motion.div
          key={`${String(showModal)}-backdrop`}
          exit="closed"
          initial="closed"
          onClick={() => onHide?.()}
          animate={show ? 'open' : 'closed'}
          variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
          className={clsx(
            'h-full w-full',
            'bg-black/[0.25] backdrop-blur-sm',
            'fixed top-0 left-0 z-[1040]'
          )}
        />
      </AnimatePresence>
    </Restart.Modal>
  );
}

export default Side;
