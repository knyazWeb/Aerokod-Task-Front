import { Lock } from 'lucide-react';

const Header = () => {
  return (
    <header className='bg-accentGreen w-screen h-[105px] rounded-br-xl py-3 px-10'>
      <div className='flex justify-start items-center gap-5'>
        <div className='text-white text-[40px] leading-none text-center italic tracking-[0.1em]'>
          Pass <br /> Manager
        </div>
        <Lock
          size={60}
          color='#fff'
        />
      </div>
    </header>
  );
};

export default Header;
