import { Task } from '@/components';
import TaskDetails from './_components/TaskDetails';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="mx-auto flex-[1_0_0] max-w-[720px] px-5 py-8 transition-all overflow-y-auto no-scrollbar">
        {children}
      </div>
      {/* Task */}
      <TaskDetails />
    </div>
  );
}
