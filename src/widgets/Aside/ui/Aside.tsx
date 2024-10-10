import { CirclePlus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ModalWrapper } from '@/shared/ui';
import { CreateServiceForm } from '@/features/CreateService';

const Aside = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const createHandler = useCallback(() => {
    setIsCreateModalOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <aside className='bg-accentGreen h-screen-minus-105 rounded-br-xl flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-10'>
          <button
            onClick={createHandler}
            type='button'
          >
            <CirclePlus
              size={60}
              className='text-white hover:text-accentYellow duration-200 ease-in-out transition-colors'
            />
          </button>
        </div>
      </aside>

      {/* Create service modal */}
      {isCreateModalOpen && (
        <ModalWrapper closeHandler={createHandler}>
          <CreateServiceForm closeModalHandler={createHandler} />
        </ModalWrapper>
      )}
    </>
  );
};

export default Aside;
