import { useState } from 'react';

import { ModalProps } from '../../../../interfaces';
import { Modal } from '../../../index';
import Add from './Add';
import { useStore } from '@/hooks';

interface Props {
  children: ({ proceed }: { proceed: () => void }) => void;
}

export default function LocalModal({ children }: Props) {
  /**
   * state
   */
  const [show, setShow] = useState(false);

  /**
   * store
   */
  const { addTaskService } = useStore();

  return (
    <>
      {children({ proceed: () => setShow(true) })}

      {show && (
        <Modal showCloseIcon={false} show={show} onHide={() => setShow(false)}>
          <Add
            onCancel={() => setShow(false)}
            onSubmit={(params, actions) => {
              addTaskService(params);
              setShow(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
