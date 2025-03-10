import Image from 'next/image';

import { Button } from '../../index';
import { Plus } from '@phosphor-icons/react';
import Form from '../Form';

interface Props {
  action?: {
    label?: string;
    onClick?: () => void;
  };
  title?: string;
}

export default function Empty({ action, title }: Props) {
  return (
    <div className="space-y-3 ">
      <div className="">
        <Image
          alt="empty"
          src="/assets/illustrations/empty-tasklist.svg"
          width={280}
          height={280}
          className="w-[160px] h-[160px] md:w-[280px] md:h-[280px] mx-auto"
        />
      </div>

      <div className="text-center text-gray-400">
        {!title && (
          <>
            <small>Looks like a fresh start!</small>
            <small className="mb-5">What`s on your to-do list?</small>
          </>
        )}

        {title && <small>{title}</small>}

        {!action && (
          <Form.Add.Modal>
            {({ proceed }) => (
              <Button onClick={() => proceed()} className=" mx-auto btn-primary">
                <Plus className="" />
                <small>Add</small>
              </Button>
            )}
          </Form.Add.Modal>
        )}
      </div>
    </div>
  );
}
