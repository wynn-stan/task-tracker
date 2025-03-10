import { useState } from 'react';

import { ModalProps } from '../../../../interfaces';
import { Modal } from '../../../index';
import Add, { IForm } from './Add';
import { useStore } from '@/hooks';
import { FormikHelpers } from 'formik';

interface Props {
  children: ({ proceed }: { proceed: () => void }) => void;
  onSubmit?: (params: IForm, actions: FormikHelpers<any>) => void;
  defaultValues?: Partial<IForm>;
}

export default function LocalModal({ children, onSubmit, defaultValues }: Props) {
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
            {...{ defaultValues }}
            onCancel={() => setShow(false)}
            onSubmit={(params, actions) => {
              if (onSubmit) {
                onSubmit(params, actions);
                setShow(false);
              } else {
                addTaskService(params);
                setShow(false);
              }
            }}
          />
        </Modal>
      )}
    </>
  );
}
