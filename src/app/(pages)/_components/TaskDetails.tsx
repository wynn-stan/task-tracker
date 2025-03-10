'use client';

import clsx from 'clsx';

import { Modal, Task } from '@/components';
import { useLayout, useStore } from '@/hooks';
import { motion, AnimatePresence } from 'motion/react';
import { useWindowWidth } from '@react-hook/window-size';
import React from 'react';

export default function TaskDetails() {
  /**
   * store
   */
  const { layout, setLayout } = useLayout();
  const { getTaskService } = useStore();

  /**
   * variables
   */
  const task = layout?.task_id ? getTaskService(layout?.task_id) : undefined;

  /**
   * function
   */
  const onHide = () => setLayout((layout) => ({ ...layout, task_id: undefined }));

  return (
    <>
      {task && (
        <Container task_id={layout.task_id} onModalClose={onHide}>
          <Task.Details.Header />
        </Container>
      )}
    </>
  );
}

function Container({
  children,
  task_id,
  onModalClose,
}: {
  children: React.ReactNode;
  task_id?: string;
  onModalClose: () => void;
}) {
  /**
   * hooks
   */
  const width = useWindowWidth();

  /**
   * variables
   */
  const taskExists = Boolean(task_id);
  const isMobile = width <= 768;
  const show = taskExists && isMobile;

  return (
    <>
      {!isMobile && (
        <AnimatePresence key={`${task_id}-presence`} mode="wait">
          {taskExists && (
            <motion.div
              key={`${task_id}-motion`}
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              exit={{ width: 0 }}
              className={clsx(
                'flex-[1_0_0] w-full h-full ',
                'border-l border-gray-200',
                'py-8 px-5'
              )}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {isMobile && (
        <Modal.Side show={show} onHide={() => onModalClose()}>
          <div className="w-[350px] h-full py-4 px-5">{children}</div>
        </Modal.Side>
      )}
    </>
  );
}
