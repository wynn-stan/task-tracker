import { useState } from 'react';

import { Modal } from '@/components';
import Sidebar from './Sidebar';

interface Props {
  children: ({ proceed }: { proceed: () => void }) => void;
}

export default function SidebarModal({ children }: Props) {
  /**
   * state
   */
  const [show, setShow] = useState(false);

  return (
    <>
      {children({ proceed: () => setShow(true) })}

      <Modal.Side direction="left" show={show} onHide={() => setShow(false)}>
        <div className="min-w-[224px] h-full" onClick={() => ({})}>
          <Sidebar />
        </div>
      </Modal.Side>
    </>
  );
}
