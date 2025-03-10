'use client';

import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';

import { useLayout, useStore } from '@/hooks';
import Header from './Header';

export default function TaskDetails() {
  /**
   * store
   */
  const { layout } = useLayout();
  const { getTaskService } = useStore();

  const task = layout?.task_id ? getTaskService(layout?.task_id) : undefined;

  return (
    <AnimatePresence key={`${task?.id}-presence`} mode="wait">
      {task?.id && (
        <motion.div
          key={`${task?.id}-motion`}
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          exit={{ width: 0 }}
          className={clsx('flex-[1_0_0] w-full ', 'border-l border-gray-200', 'py-8 px-5')}
        >
          <Header />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
