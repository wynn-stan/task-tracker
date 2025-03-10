'use client';

import { Plus } from '@phosphor-icons/react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as yup from 'yup';
import clsx from 'clsx';

import { Button, Field, Skeleton, Task } from '../../../index';
import PriorityFilter from '../../Utils/PriorityFilter';
import { useLayout, useStore } from '@/hooks';
import { TaskModel } from '@/models/task';

interface Props {
  onSelect: (id: string) => void;
  onCancel: () => void;
}

export default function Search({ onCancel, onSelect }: Props) {
  /**
   * store
   */
  const { searchTaskService } = useStore();

  /**
   * State
   */
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<TaskModel[]>([]);

  /**
   * functions
   */
  const handleSearch = (key: string) => {};

  useEffect(() => {
    setLoading(true);

    const results = searchTaskService(search);
    setResults(results || []);

    setTimeout(() => setLoading(false));
  }, [search]);

  return (
    <div className="p-5 pb-10 space-y-4">
      <Field.Search
        autoFocus
        onSearch={(key: string) => {
          setSearch(key);
        }}
        wrapperClassName={clsx('border-0 !px-0 !py-0')}
        inputClassName={clsx('placeholder:text-gray-400 !py-0 text-gray-600')}
        placeholder="Search..."
      />

      <div className="w-full h-[1px] bg-gray-200" />

      {/* Is loading */}
      {isLoading && (
        <div className="space-y-3">
          <Skeleton height={87} />
          <Skeleton height={87} />
          <Skeleton height={87} />
          <Skeleton height={87} />
        </div>
      )}

      {/* No search */}
      {!isLoading && !Boolean(search) && (
        <div className="space-y-3 ">
          <div className="">
            <Image
              alt="empty"
              src="/assets/illustrations/search.png"
              width={280}
              height={280}
              className="w-[160px] h-[160px] md:w-[280px] md:h-[280px] mx-auto"
            />
          </div>

          <div className="text-center text-gray-400">
            <small className="text-gray-400 font-medium">
              Type something to start your search.
            </small>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && !!search && !!results?.length && (
        <div className="space-y-4 overflow-y-auto max-h-[360px]">
          {results?.map((item, index) => {
            return (
              <Task.List.Item
                key={index}
                onCheck={() => {
                  //
                }}
                onClick={() => onSelect(item.id)}
                {...item}
              />
            );
          })}
        </div>
      )}

      {/* No results */}
      {!isLoading && !!search && !results?.length && (
        <div className="space-y-3 ">
          <div className="">
            <Image
              alt="empty"
              src="/assets/illustrations/ghost.png"
              width={280}
              height={280}
              className="w-[160px] h-[160px] md:w-[280px] md:h-[280px] mx-auto"
            />
          </div>

          <div className="text-center text-gray-400">
            <small className="text-gray-400 font-medium">
              No results found. Try a different keyword.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
