'use client';

import {
  CalendarDots,
  Clock,
  Hourglass,
  MagnifyingGlass,
  PlusCircle,
  TrashSimple,
} from '@phosphor-icons/react';
import { adventurerNeutral } from '@dicebear/collection';
import React, { HTMLAttributes, useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import routes from '../../routes';
import Modals from '../Modals';

type Icon = (props: any) => React.ReactNode;

interface NavLinks {
  [key: string]: {
    label: string;
    sub_items: {
      label: string;
      slug?: string;
      Icon?: Icon;
      indicator_color?: string;
      icon_fill?: boolean;
      Modal?: ({
        children,
      }: {
        children: ({ proceed }: { proceed: () => void }) => React.ReactNode;
      }) => React.ReactNode;
      count?: number;
    }[];
  };
}

export default function Sidebar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  /**
   * routes
   */
  const path = usePathname();
  /**
   * Memo
   */
  const profileUrl = useMemo(() => {
    return createAvatar(adventurerNeutral, { size: 32 }).toDataUri();
  }, []);

  /**
   * Nav
   */
  const NavLinks: NavLinks = {
    quick_actions: {
      label: 'Quick Actions',
      sub_items: [
        { Modal: Modals.Search, Icon: MagnifyingGlass, icon_fill: true, label: 'Search' },
        { Modal: Modals.AddTask, Icon: PlusCircle, icon_fill: true, label: 'Add task' },
      ],
    },
    schedule: {
      label: 'Schedule',
      sub_items: [
        { label: 'Today', slug: routes.schedule.today, Icon: Clock },
        { label: 'Upcoming', slug: routes.schedule.upcoming, Icon: CalendarDots },
        { label: 'Overdue', slug: routes.schedule.overdue, Icon: Hourglass },
      ],
    },
    tasks: {
      label: 'Tasks',
      sub_items: [
        { label: 'All', slug: routes.tasks.all, indicator_color: '#E5E7EB', count: 20 },
        { label: 'High', slug: routes.tasks.high, indicator_color: '#F75D34', count: 2 },
        { label: 'Medium', slug: routes.tasks.medium, indicator_color: '#FFE248', count: 8 },
        { label: 'Low', slug: routes.tasks.low, indicator_color: '#E5E7EB', count: 5 },
        { label: 'Completed', slug: routes.tasks.completed, indicator_color: '#0074D8', count: 5 },
      ],
    },
    manage: {
      label: 'Manage',
      sub_items: [{ label: 'Trash', slug: routes.manage.trash, Icon: TrashSimple }],
    },
  };

  return (
    <div
      className={clsx(
        'bg-gray-50 px-5 py-8 text-warn',
        'max-w-[224px]',
        'border-r border-gray-200',
        'w-full space-y-5',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          alt="profile"
          className="bg-cover bg-center rounded-md"
          width={32}
          height={32}
          src={profileUrl}
        />
        <p className="text-gray-600 font-medium">Anon245</p>
      </div>

      {Object.values(NavLinks).map((section, i) => {
        return (
          <div key={i} className="space-y-3">
            <small className="smaller font-medium text-gray-400">{section.label}</small>
            <div className="space-y-2">
              {section.sub_items.map((Item, j) => {
                const isModalAction = Item?.Modal;
                const activeRoute = path.includes(Item?.slug || '');
                return (
                  <>
                    {Item?.Modal && (
                      <Item.Modal key={j}>
                        {({ proceed }) => (
                          <div
                            role="button"
                            className="flex items-center gap-2.5 h-8 px-2 hover:bg-gray-100 rounded-md"
                            onClick={() => proceed()}
                          >
                            {Item?.Icon && (
                              <Item.Icon
                                size={20}
                                weight={Item?.icon_fill ? 'fill' : ''}
                                className={Item?.icon_fill ? 'text-primary' : 'text-gray-400'}
                              />
                            )}
                            <small className="font-medium text-gray-600">{Item.label}</small>
                          </div>
                        )}
                      </Item.Modal>
                    )}

                    {!isModalAction && (
                      <Link
                        key={j}
                        href={Item?.slug || ''}
                        className={clsx(
                          'flex items-center justify-between gap-2.5 px-2 h-8 rounded-md',
                          activeRoute ? 'bg-[#EBEBED]' : 'hover:bg-gray-100'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {Item?.Icon && (
                            <Item.Icon
                              size={20}
                              weight={Item?.icon_fill ? 'fill' : undefined}
                              className={Item?.icon_fill ? 'text-primary' : 'text-gray-400'}
                            />
                          )}
                          {Item?.indicator_color && (
                            <div
                              style={{ background: Item.indicator_color }}
                              className={clsx(`w-2 h-2 rounded-full`)}
                            />
                          )}
                          <small className="font-medium text-gray-600">{Item.label}</small>
                        </div>
                        {Item?.count && <small className="text-gray-400">{Item.count}</small>}
                      </Link>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
