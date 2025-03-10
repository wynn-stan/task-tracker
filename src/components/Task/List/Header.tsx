import { motion, AnimatePresence } from 'motion/react';
import { List, Plus, Trash, type Icon } from '@phosphor-icons/react';
import React, { useState } from 'react';

import PriorityFilter from '../Utils/PriorityFilter';
import { Button, RootNavigation } from '../../index';

import Form from '../Form';
import clsx from 'clsx';

interface Props {
  title: string;
  showAdd?: boolean;
  indicator_color?: string;
  Icon?: Icon;
  showPriorityFilter?: boolean;
}

export default function Header({
  title,
  showPriorityFilter,
  Icon,
  indicator_color,
  showAdd,
}: Props) {
  /**
   * state
   */
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <RootNavigation.SidebarModal>
          {({ proceed }) => (
            <button className="md:hidden" onClick={() => proceed()}>
              <List size={24} />
            </button>
          )}
        </RootNavigation.SidebarModal>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div>
              {Icon && <Icon weight="fill" />}
              {indicator_color && (
                <div style={{ background: indicator_color }} className="w-3 h-3 rounded-full" />
              )}
            </div>
            <h4>{title}</h4>
          </div>
          {showPriorityFilter && <PriorityFilter />}
        </div>
      </div>

      {showAdd && (
        <Form.Add.Modal>
          {({ proceed }) => (
            <Button
              onClick={() => proceed()}
              className={clsx(
                'flex items-center justify-start gap-3',
                'relative border border-gray-100 rounded-md w-full'
              )}
            >
              <Plus className="text-gray-600" />
              <small className="font-medium text-gray-400">Add task</small>
            </Button>
          )}
        </Form.Add.Modal>
      )}
    </div>
  );
}
