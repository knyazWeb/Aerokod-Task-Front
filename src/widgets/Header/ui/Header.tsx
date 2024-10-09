import { Lock, Delete } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Input } from '@/shared/ui';
import * as React from 'react';

interface HeaderProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const Header = ({ searchValue, setSearchValue }: HeaderProps) => {
  return (
    <header className='bg-accentGreen w-screen h-[105px] rounded-br-xl py-3 px-10'>
      <div className='flex justify-start items-center gap-5'>
        <div className='text-white text-[40px] leading-none text-center italic tracking-[0.1em]'>
          Pass <br /> Manager
        </div>
        <Lock
          size={60}
          color='#fff'
          className='mr-10'
        />

        <div className='relative w-1/2'>
          <Input
            type={'text'}
            maxLength={70}
            placeholder={'Write your service...'}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.currentTarget.value)
            }
            className={'text-xl py-4 pr-12'}
          />
          <button
            onClick={() => setSearchValue('')}
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
          >
            <Delete />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
