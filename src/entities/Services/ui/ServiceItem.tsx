import { Eye, EyeOff, Copy, Trash } from 'lucide-react';
import { cn } from '@/shared/lib';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ModalWrapper } from '@/shared/ui';
import { RemoveServiceForm } from '@/features/RemoveService';

interface ServiceItemProps {
  serviceName: string;
  servicePassword: string;
  className?: string;
}

export default function ServiceItem({
  serviceName,
  servicePassword,
  className,
}: ServiceItemProps) {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [lastCopyTime, setLastCopyTime] = useState<number>(0);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

  const hiddenPassword = useMemo(() => {
    return '*'.repeat(servicePassword.length);
  }, [servicePassword]);

  // Обработчик модалки удаления
  const removeHandler = useCallback(() => {
    setIsRemoveModalOpen((prevState) => !prevState);
  }, []);

  // Обработчик кнопки для показа пароля
  const showPasswordHandler = () => {
    setIsPasswordHidden((prevState) => !prevState);
  };

  // Обработчик кнопки для копирования текста
  const copyToClipboardHandler = (textToCopy: string) => {
    const currentTime = Date.now();
    if (currentTime - lastCopyTime < 1000) {
      toast.error('You can copy only once per second');
      return;
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setLastCopyTime(currentTime);
        toast.success('Password copy successfully');
      })
      .catch(() => {
        toast.success('Something was wrong');
      });
  };

  return (
    <>
      <div className={cn('flex justify-between items-center', className)}>
        <p>{serviceName}</p>
        <div className='flex items-center justify-between gap-4'>
          <p className={cn('pt-1', { 'tracking-[0.15em]': isPasswordHidden })}>
            {isPasswordHidden ? hiddenPassword : servicePassword}
          </p>
          <div className='flex items-center justify-between gap-4'>
            <button onClick={showPasswordHandler}>
              {isPasswordHidden ? <Eye /> : <EyeOff />}
            </button>
            <button onClick={() => copyToClipboardHandler(servicePassword)}>
              <Copy />
            </button>
            <button onClick={removeHandler}>
              <Trash />
            </button>
          </div>
        </div>
      </div>

      {/* Remove service modal */}
      {isRemoveModalOpen && (
        <ModalWrapper closeHandler={removeHandler}>
          <RemoveServiceForm
            closeModalHandler={removeHandler}
            service={{ service: serviceName, password: servicePassword }}
          />
        </ModalWrapper>
      )}
    </>
  );
}
