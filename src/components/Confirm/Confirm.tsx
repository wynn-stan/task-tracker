import { confirmable, ConfirmDialogProps, createConfirmation } from 'react-confirm'; // prettier-ignore
import React, { ReactNode } from 'react';
import clsx from 'clsx';

import Button, { ButtonProps } from '../Button/Button';
import Modal, { ModalProps } from '../Modal/Modal';

export interface ConfirmButtonProps extends ButtonProps {
  value?: string;
}

export interface ConfirmProps {
  /**
   * header of the message
   */
  header?: string;
  /**
   * props to different buttons, proceed and cancel
   */
  buttons?: {
    cancel?: ConfirmButtonProps;
    proceed?: ConfirmButtonProps;
  };
  /**
   * confirm message
   */
  message: ReactNode;
  /**
   * Modal Props
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Dialog = ({
  show,
  header,
  dismiss,
  cancel,
  proceed,
  message,
  buttons,
  size = 'md',
}: ConfirmDialogProps<ConfirmProps, boolean>) => {
  return (
    <Modal index={2} size={size} show={show} header={header} onHide={() => cancel()}>
      <>
        <Modal.Body>
          <small>{message}</small>
        </Modal.Body>
        <Modal.Footer>
          <div className={clsx('flex gap-2 items-center justify-end')}>
            <Button className="btn-outline-neutral" onClick={() => cancel()} {...buttons?.cancel}>
              {buttons?.cancel?.value || 'Cancel'}
            </Button>
            <Button className="btn-primary" onClick={() => proceed(true)} {...buttons?.proceed}>
              {buttons?.proceed?.value || 'Proceed'}
            </Button>
          </div>
        </Modal.Footer>
      </>
    </Modal>
  );
};

export default createConfirmation(confirmable(Dialog));
