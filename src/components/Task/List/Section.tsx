import { capitalize } from 'lodash';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { TPriorityFilter } from '@/interfaces';
import { useLayout, useStore } from '@/hooks';
import { indicatorColors } from '@/utils';

import DotIndicator from '../Utils/DotIndicator';
import { Accordion } from '../../index';
import Item from './Item';
import DraggableContext from './DraggableContext';

interface Props {
  priorities: TPriorityFilter[];
}

export default function Section({ priorities }: Props) {
  /**
   * store
   */
  const { tasksSummary, getAllTasksService, updateTaskService } = useStore();
  const { setLayout } = useLayout();

  const getPriorityTasks = (priority: TPriorityFilter) =>
    getAllTasksService(priority).filter((item) => !item?.isTrashed);

  return (
    <Accordion defaultActiveKey={priorities} className="space-y-5 gap-0">
      {priorities.map((priority, index) => (
        <Accordion.Item key={index} eventKey={priority} className="border-0 px-0 divide-y-0">
          <Accordion.Header className="py-0 gap-3">
            <div className="flex items-center gap-2">
              <DotIndicator priority={priority} />
              <small className="text-gray-600">
                {capitalize(priority !== 'completed' ? `${priority} priority` : priority)}
              </small>
              <small className={clsx('px-1 bg-gray-100 text-gray-400 rounded-md')}>
                {tasksSummary[priority]}
              </small>
            </div>
          </Accordion.Header>

          <DraggableContext tasks={getPriorityTasks(priority).map((item) => item.id)}>
            <Accordion.Body contentClassName="space-y-3">
              {getPriorityTasks(priority).map((item, index) => (
                <Item
                  key={item.id}
                  onClick={() => {
                    setLayout((layout) => ({ ...layout, task_id: item.id }));
                  }}
                  {...item}
                />
              ))}
            </Accordion.Body>
          </DraggableContext>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
