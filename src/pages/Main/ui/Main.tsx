import { Header } from '@/widgets/Header';
import { Aside } from '@/widgets/Aside';
import { useCallback, useState } from 'react';
import { ModalWrapper } from '@/shared/ui';

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
          <section></section>
        </div>
      </main>

      {/* Create service modal */}
      {isCreateModalOpen && (
        <ModalWrapper closeHandler={createHandler}>
          <div></div>
        </ModalWrapper>
      )}

      {/* Remove service modal */}
      {isRemoveModalOpen && (
        <ModalWrapper closeHandler={removeHandler}>
          <div></div>
        </ModalWrapper>
      )}
    </>
  );
}
