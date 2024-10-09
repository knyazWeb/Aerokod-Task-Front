import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';
import { useCallback, useState } from 'react';
import { ModalWrapper } from '@/shared/ui';
import { CreateServiceForm } from '@/features/CreateService';
import { ServicesPanel } from '@/widgets/ServicesPanel';

export default function Main() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

  const createHandler = useCallback(() => {
    setIsCreateModalOpen((prevState) => !prevState);
  }, [isCreateModalOpen]);

  const removeHandler = useCallback(() => {
    setIsRemoveModalOpen((prevState) => !prevState);
  }, [isRemoveModalOpen]);

  return (
    <>
      <main>
        <Header />
        <div className='grid grid-cols-[100px_1fr] grid-rows-1'>
          <Aside
            createHandler={createHandler}
            removeHandler={removeHandler}
          />
          <ServicesPanel />
        </div>
      </main>

      {/* Create service modal */}
      {isCreateModalOpen && (
        <ModalWrapper closeHandler={createHandler}>
          <CreateServiceForm closeModalHandler={createHandler} />
        </ModalWrapper>
      )}

      {/* Remove service modal */}
      {isRemoveModalOpen && (
        <ModalWrapper closeHandler={removeHandler}>
          {/* TODO: Сделать форму удаления в features */}
          <div></div>
        </ModalWrapper>
      )}
    </>
  );
}
