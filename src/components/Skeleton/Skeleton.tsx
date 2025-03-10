import clsx from 'clsx';

export interface SkeletonProps {
  width?: number;
  height?: number;
  circle?: boolean;
  className?: string;
}

export function Skeleton({ width, height, circle, className }: SkeletonProps) {
  return (
    <div
      {...((width || height) && { style: { width, height } })}
      className={clsx(
        'animate-pulse bg-gray-200',
        circle ? 'rounded-full' : 'rounded-lg',
        !width && `w-full`,
        !height && `h-3.5`,
        className
      )}
    />
  );
}

export default Skeleton;
