import { House, MagnifyingGlass, Plus, TrashSimple } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import routes from '../../routes';
import Modals from '../Modals';

interface NavLink {
  label: string;
  slug?: string;
  Icon: (props: any) => React.ReactNode;
  Modal?: ({
    children,
  }: {
    children: ({ proceed }: { proceed: () => void }) => React.ReactNode;
  }) => React.ReactNode;
}

export default function Navbar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  /**
   * routes
   */
  const path = usePathname();

  /**
   * variables
   */
  const NavLinks: NavLink[] = [
    { label: 'Home', Icon: House, slug: routes.tasks.all },
    { label: 'Search', Icon: MagnifyingGlass, Modal: Modals.Search },
    { label: 'Add Task', Icon: Plus, Modal: Modals.AddTask },
    { label: 'Trash', Icon: TrashSimple, slug: routes.manage.trash },
  ];
  return (
    <div className={clsx('fixed bottom-0 w-full', 'py-4 px-8', 'flex justify-between', className)}>
      {NavLinks.map((Item, index) => {
        const activeRoute = path.includes(Item?.slug || '');
        return (
          <>
            {Item.Modal && (
              <Item.Modal key={index}>
                {({ proceed }) => (
                  <div role="button" className="space-y-2" onClick={() => proceed()}>
                    <Item.Icon size={24} className="text-gray-800 mx-auto" />
                    <small className="smaller text-gray-500 text-center">{Item.label}</small>
                  </div>
                )}
              </Item.Modal>
            )}
            {!Item?.Modal && (
              <Link
                href={Item?.slug || ''}
                role="button"
                key={index}
                className={clsx('space-y-2', activeRoute && 'text-primary')}
              >
                <Item.Icon
                  size={24}
                  weight={activeRoute ? 'fill' : undefined}
                  className={clsx(' mx-auto', !activeRoute && 'text-gray-800')}
                />
                <small className={clsx('smallertext-center', !activeRoute && 'text-gray-500 ')}>
                  {Item.label}
                </small>
              </Link>
            )}
          </>
        );
      })}
    </div>
  );
}
