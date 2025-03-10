import { CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';

import { TPriorityFilter } from '@/interfaces';
import { indicatorColors } from '@/utils';

import { Dropdown } from '../../index';
import DotIndicator from './DotIndicator';
import clsx from 'clsx';

interface Props {
  onChange?: (key: TPriorityFilter) => void;
  defaultValue?: TPriorityFilter;
  filters?: TPriorityFilter[];
  toggleClassName?: string;
}

export default function PriorityFilter({
  defaultValue = 'all',
  filters = ['all', 'high', 'medium', 'low', 'completed'],
  toggleClassName,
  onChange,
}: Props) {
  /**
   * state
   */
  const [active, setActive] = useState<TPriorityFilter>(defaultValue);

  /**
   * variables
   */
  const options = [
    { label: 'All priorities', value: 'all' },
    { label: 'High priority', value: 'high' },
    { label: 'Medium priority', value: 'medium' },
    { label: 'Low priority', value: 'low' },
    { label: 'Completed', value: 'completed' },
  ].filter((item) => filters.includes(item.value as TPriorityFilter)) as {
    label: string;
    value: TPriorityFilter;
  }[];

  return (
    <Dropdown>
      <Dropdown.Toggle
        className={clsx(
          'px-1.5 h-[28px] border border-gray-300 text-gray-600 rounded-md',
          toggleClassName
        )}
      >
        <DotIndicator priority={active} />
        <small className="px-2 ">
          {options.find((item) => item.value === active)?.label || '--'}
        </small>
        <CaretDown size={12} className="text-gray-600" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((item, index) => (
          <Dropdown.Item
            className="flex gap-3"
            key={index}
            onClick={() => {
              setActive(item.value);
              onChange?.(item.value);
            }}
          >
            <div
              style={{ background: indicatorColors?.[item.value] }}
              className="w-2.5 h-2.5 rounded-full"
            />
            <small className="font-medium text-gray-600"> {item.label}</small>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
