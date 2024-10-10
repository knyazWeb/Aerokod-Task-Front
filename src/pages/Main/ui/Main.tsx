import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';
import { useState } from 'react';
import { ServicesPanel } from '@/widgets/ServicesPanel';

export default function Main() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <main>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className='grid grid-cols-[100px_1fr] grid-rows-1'>
        <Aside />
        <ServicesPanel searchValue={searchValue} />
      </div>
    </main>
  );
}
