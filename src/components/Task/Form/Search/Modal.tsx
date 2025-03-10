import { useState } from 'react';

import { Modal } from '../../../index';
import Search from './Search';

import { useLayout } from '@/hooks';

interface Props {
  children: ({ proceed }: { proceed: () => void }) => void;
}

export default function LocalModal({ children }: Props) {
  /**
   * state
   */
  const [show, setShow] = useState(false);

  /**
   * layout
   */
  const { layout, setLayout } = useLayout();

  return (
    <>
      {children({ proceed: () => setShow(true) })}

      <Modal showCloseIcon={false} show={show} onHide={() => setShow(false)}>
        <Search
          onCancel={() => setShow(false)}
          onSelect={(id) => {
            setLayout((layout) => ({ ...layout, task_id: id }));
            setShow(false);
          }}
        />
      </Modal>
    </>
  );
}
