import { ChangeEvent, HtmlHTMLAttributes, useCallback, useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import debounce from 'lodash/debounce';

import clsx from 'clsx';

export interface SearchProps extends HtmlHTMLAttributes<HTMLInputElement> {
  delay?: number;
  placeholder?: string;
  onSearch: (search: string) => void;
  wrapperClassName?: string;
  inputClassName?: string;
}

export default function Search({
  delay = 500,
  onSearch,
  wrapperClassName,
  inputClassName,
  placeholder,
  ...props
}: SearchProps) {
  /**
   * state
   */
  const [search, setSearch] = useState<string>();

  /**
   * function
   */
  const handleSearch = useCallback(
    debounce((search: string) => {
      onSearch(search);
    }, delay),
    []
  );

  return (
    <div
      className={clsx(
        'placeholder:text-gray-200',
        'flex gap-3 items-center',
        `outline-none px-4 border border-gray-10 w-full ${wrapperClassName}`
      )}
    >
      <MagnifyingGlass className="text-gray-400" size={20} />

      <input
        name="search"
        autoComplete="off"
        placeholder={placeholder || 'Search...'}
        className={clsx('py-3 outline-none w-full', inputClassName)}
        onChange={({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
          setSearch(value);
          handleSearch(value);
        }}
        {...props}
      />
    </div>
  );
}
