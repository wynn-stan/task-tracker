import {
  arrayMove,
  arraySwap,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { TaskModel } from '@/models/task';
import { useStore } from '@/hooks';

import Task from '../index';
import React from 'react';

interface Props {
  children?: React.ReactNode;
  tasks: string[];
}

export default function DraggableContext({ tasks, children }: Props) {
  /**
   * store
   */
  const { store, setStore } = useStore();

  /**
   * sensors
   */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  /**
   * functions
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const allTasks = store?.tasks || [];

    const { active, over } = event;
    if (active.id === over?.id) return;

    const originalPosition = allTasks.findIndex((item) => item.id === active.id);
    const newPosition = allTasks.findIndex((item) => item.id === over?.id);

    setStore(arrayMove(allTasks, originalPosition, newPosition));
  };

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
