import { useContext } from 'react';

import { StoreContext } from '@/providers/store';
import { TaskModel } from '@/models/task';
import { uniqueId } from 'lodash';
import { v4 } from 'uuid';
import { TPriorityFilter } from '@/interfaces';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

export const useStore = () => {
  /**
   * contexts
   */
  const { store, setStore } = useContext(StoreContext);

  const allTasks = store?.tasks || [];

  /**
   * functions
   */
  const getAllTasksService = (priority?: TPriorityFilter) => {
    if (priority) {
      return allTasks?.filter((item) => item.priority === priority);
    }
    return allTasks;
  };

  const addTaskService = (task: Omit<TaskModel, 'id' | 'last_updated'>) => {
    const tasks = [{ ...task, id: v4(), last_updated: dayjs().toISOString() }, ...allTasks];
    setStore(tasks);
    toast.success('Success');
  };

  const updateTaskService = (id: string, newTask: Partial<TaskModel>) => {
    const taskIndex = allTasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
      const oldTask = allTasks[taskIndex];
      const newList = [...allTasks];
      newList[taskIndex] = { ...oldTask, ...newTask };
      setStore(newList);
    }

    toast.success('Success');
  };

  const removeTaskService = (id: string) => {
    const taskIndex = allTasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
      setStore(allTasks.splice(taskIndex, 1));
    }

    toast.success('Success');
  };

  const getTaskService = (id: string) => {
    return allTasks.find((item) => item.id === id);
  };

  const searchTaskService = (content: string) => {
    const formatted = content.toLowerCase();
    return allTasks.filter(
      (item) =>
        item.title.toLowerCase().includes(formatted) ||
        item?.description?.toLowerCase().includes(formatted)
    );
  };

  const tasksSummary = (() => {
    const total = allTasks.length;
    const trashed = allTasks.filter((item) => item?.isTrashed).length;
    const high = allTasks.filter((item) => item.priority === 'high').length;
    const medium = allTasks.filter((item) => item.priority === 'medium').length;
    const low = allTasks.filter((item) => item.priority === 'low').length;
    const completed = allTasks.filter((item) => item?.complete).length;
    const all = total - trashed;

    return {
      all,
      high,
      medium,
      low,
      completed,
      trashed,
      total,
    };
  })();

  return {
    store,
    setStore,
    getAllTasksService,
    addTaskService,
    updateTaskService,
    removeTaskService,
    getTaskService,
    tasksSummary,
    searchTaskService,
  };
};
