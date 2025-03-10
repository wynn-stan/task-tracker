import { useContext } from 'react';

import { StoreContext } from '@/providers/store';
import { CommentModel, TaskModel } from '@/models/task';
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

  const addCommentService = (task_id: string, comment: CommentModel) => {
    const taskIndex = allTasks.findIndex((item) => item.id === task_id);
    if (taskIndex === -1) {
      toast.error('Task not found');
      return;
    }

    const task = allTasks[taskIndex];

    const updatedTask = { ...task, comments: [comment, ...(task.comments || [])] };

    const updatedTasks = [
      ...allTasks.slice(0, taskIndex),
      updatedTask,
      ...allTasks.slice(taskIndex + 1),
    ];

    setStore(updatedTasks);
    toast.success('success');
  };

  const updateTaskService = (id: string, details: Partial<TaskModel>) => {
    const taskIndex = allTasks.findIndex((item) => item.id === id) as number;

    if (taskIndex === -1) {
      toast.error('Task not found');
      return;
    }

    const task = allTasks[taskIndex];
    const updatedTask = { ...task, ...details };
    const updatedTasks = [
      ...allTasks.slice(0, taskIndex),
      updatedTask,
      ...allTasks.slice(taskIndex + 1),
    ];
    setStore(updatedTasks);
    toast.success('Success');
  };

  const updateTaskCommentService = (
    task_id: string,
    comment_id: string,
    details: Partial<CommentModel>
  ) => {
    const taskIndex = allTasks.findIndex((item) => item.id === task_id);
    if (taskIndex === -1) {
      toast.error('Task not found');
      return;
    }

    const task = allTasks[taskIndex];

    const commentIndex = task?.comments?.findIndex((item) => item.id === comment_id) as number;
    if (!task.comments?.length || commentIndex === -1) {
      toast.error('Comment not found');
      return;
    }

    const updatedComment = { ...task.comments[commentIndex], ...details };

    const updatedTask = {
      ...task,
      comments: [
        ...task.comments.slice(0, commentIndex),
        updatedComment,
        ...task.comments.slice(commentIndex + 1),
      ],
    };

    const updatedTasks = [
      ...allTasks.slice(0, taskIndex),
      updatedTask,
      ...allTasks.slice(taskIndex + 1),
    ];

    setStore(updatedTasks);
    toast.success('Success');
  };

  const removeTaskService = (id: string) => {
    const taskIndex = allTasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
      setStore(allTasks.splice(taskIndex, 1));
    }

    toast.success('Success');
  };

  const removeCommentService = (task_id: string, comment_id: string) => {
    const taskIndex = allTasks.findIndex((item) => item.id === task_id);
    if (taskIndex === -1) {
      toast.error('Task not found');
      return;
    }

    const task = allTasks[taskIndex];

    const commentIndex = task?.comments?.findIndex((item) => item.id === comment_id) as number;
    if (!task.comments?.length || commentIndex === -1) {
      toast.error('Comment not found');
      return;
    }

    const updatedTask = {
      ...task,
      comments: [...task.comments.slice(0, commentIndex), ...task.comments.slice(commentIndex + 1)],
    };
    const updatedTasks = [
      ...allTasks.slice(0, taskIndex),
      updatedTask,
      ...allTasks.slice(taskIndex + 1),
    ];

    setStore(updatedTasks);
    toast.success('Success');
  };

  const getTaskService = (id: string) => {
    return allTasks.find((item) => item.id === id);
  };

  const searchTaskService = (content: string) => {
    const formatted = content.toLowerCase();
    return allTasks.filter(
      (item) =>
        item?.title?.toLowerCase()?.includes(formatted) ||
        item?.description?.toLowerCase()?.includes(formatted)
    );
  };

  const tasksSummary = (() => {
    const total = allTasks.length;
    const trashed = allTasks.filter((item) => item?.isTrashed).length;
    const high = allTasks.filter((item) => item.priority === 'high' && !item?.isTrashed).length;
    const medium = allTasks.filter((item) => item.priority === 'medium' && !item?.isTrashed).length;
    const low = allTasks.filter((item) => item.priority === 'low' && !item?.isTrashed).length;
    const completed = allTasks.filter((item) => item?.complete && !item?.isTrashed).length;
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
    getTaskService,

    addTaskService,
    addCommentService,

    updateTaskService,
    updateTaskCommentService,

    removeTaskService,
    removeCommentService,

    tasksSummary,
    searchTaskService,
  };
};
