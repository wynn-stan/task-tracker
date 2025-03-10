import { TPriorityFilter } from '@/interfaces';
import { indicatorColors } from '@/utils';

interface Props {
  priority: TPriorityFilter;
}

export default function DotIndicator({ priority }: Props) {
  return (
    <div style={{ background: indicatorColors?.[priority] }} className="w-2.5 h-2.5 rounded-full" />
  );
}
