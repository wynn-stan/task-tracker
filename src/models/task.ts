import { TPriorityFilter } from '@/interfaces';

export interface CommentModel {
  id: string;
  content: string;
  last_updated: string;
}

export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  comments?: CommentModel[];
  due_on?: string;
  complete?: boolean;
  priority?: TPriorityFilter;
  isTrashed?: boolean;
  last_updated: string;
  last_priority?: TPriorityFilter;
}
