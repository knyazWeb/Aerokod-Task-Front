import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';
import { useCallback, useState } from 'react';
import { ModalWrapper } from '@/shared/ui';
import { CreateServiceForm } from '@/features/CreateService';
import { ServicesPanel } from '@/widgets/ServicesPanel';

export default function Main() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const createHandler = useCallback(() => {
    setIsCreateModalOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <main>
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className='grid grid-cols-[100px_1fr] grid-rows-1'>
          <Aside
            createHandler={createHandler}
          />
          <ServicesPanel searchValue={searchValue} />
        </div>
      </main>

      {/* Create service modal */}
      {isCreateModalOpen && (
        <ModalWrapper closeHandler={createHandler}>
          <CreateServiceForm closeModalHandler={createHandler} />
        </ModalWrapper>
      )}
    </>
  );
}
