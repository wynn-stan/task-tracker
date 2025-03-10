import { HTMLProps, useEffect, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import * as Restart from '@restart/ui';
import clsx from 'clsx';

export interface ModalProps extends Omit<Restart.ModalProps, 'children'> {
  index?: number;
  header?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  dialogProps?: HTMLProps<HTMLDivElement>;
  children?: React.ReactNode;
  previous?: () => void;
  showCloseIcon?: boolean;
}

export function Modal({
  size,
  show,
  header,
  onHide,
  children,
  index = 0,
  backdrop,
  dialogProps,
  showCloseIcon = true,
  ...props
}: ModalProps) {
  /**
   * variables
   */
  const sizeClassName = (() => {
    switch (size) {
      case 'sm':
        return 'max-w-[464px] rounded-lg';
      case 'lg':
        return 'max-w-[852px] rounded-lg';
      case 'xl':
        return 'max-w-[1232px] rounded-lg';
      case 'full':
        return 'max-w-full h-screen overflow-y-auto !my-0';
      default:
        return 'max-w-[564px] rounded-lg';
    }
  })();

  const zIndex = 1050 + index * 5;

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.25 },
  };

  /**
   * state
   */
  const [showModal, setShowModal] = useState(false);

  /**
   * function
   */
  const handleClick = (e: any) => {
    e.stopPropagation();

    if (backdrop === 'static') {
      return;
    }

    if (e.target !== e.currentTarget) {
      return;
    }

    return handleClose();
  };

  const handleClose = () => {
    onHide?.();
    setTimeout(() => setShowModal(false), 300);
  };

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
      onClick={handleClick}
      aria-labelledby="modal"
      style={{ zIndex: zIndex + 5 }}
      className={clsx('w-full h-full', `fixed left-0 top-0`, 'overflow-x-hidden overflow-y-auto')}
      renderBackdrop={(backdropProps) => (
        <motion.div
          {...backdropProps}
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 0.99 : 0 }}
          className={clsx(
            'w-full h-full',
            `fixed top-0 left-0`,
            'bg-black/25 inset-0 backdrop-blur-[5.5px]'
          )}
        />
      )}
      {...{ backdrop, ...props }}
    >
      <motion.div
        initial="hidden"
        onClick={handleClick}
        variants={modalVariants}
        animate={show ? 'visible' : 'hidden'}
        className={clsx(
          sizeClassName,
          'flex items-center justify-center p-4',
          'relative',
          'mx-auto w-full my-6',
          'min-h-[calc(100%-3rem)]',
          dialogProps?.className
        )}
      >
        <div className={clsx('space-y-3 w-full rounded-lg', 'shadow-3xl bg-white relative')}>
          {showCloseIcon && (
            <div
              role="button"
              onClick={() => handleClose()}
              className={clsx(
                'ml-auto !px-0 !h-6 !w-6 border-0 active:shadow-none',
                'flex items-center justify-center rounded-full bg-white'
              )}
            >
              <X weight="bold" />
            </div>
          )}

          <div>{children}</div>
          {/* <div className="md:px-10 md:py-6 p-4 relative">{children}</div> */}
        </div>
      </motion.div>
    </Restart.Modal>
  );
}

export default Modal;
