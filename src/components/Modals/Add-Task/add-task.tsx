import { useState } from 'react';

import { Modal } from '@/components';

interface Props {
  children: ({ proceed }: { proceed: () => void }) => void;
}

export default function AddTask({ children }: Props) {
  /**
   * state
   */
  const [show, setShow] = useState(false);

  return (
    <>
      {children({ proceed: () => setShow(true) })}

      <Modal show={show} onHide={() => setShow(false)}>
        <div>Do something related to adding tasks</div>
      </Modal>
    </>
  );
}
