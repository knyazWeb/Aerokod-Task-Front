import { CirclePlus } from 'lucide-react';
import { CircleMinus } from 'lucide-react';
import { memo } from 'react';

interface AsideProps {
  createHandler: () => void;
  removeHandler: () => void;
}

const Aside = ({ createHandler, removeHandler }: AsideProps) => {
  return (
    <aside className='bg-accentGreen h-screen-minus-105 rounded-br-xl flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-10'>
        <button
          onClick={createHandler}
          type='button'
        >
          <CirclePlus
            size={60}
            color='#fff'
          />
        </button>
        <button
          onClick={removeHandler}
          type='button'
        >
          <CircleMinus
            size={60}
            color='#fff'
          />
        </button>
      </div>
    </aside>
  );
};

export default memo(Aside);
