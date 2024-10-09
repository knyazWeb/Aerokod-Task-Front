import { Eye, EyeOff, Copy } from 'lucide-react';
import { cn } from '@/shared/lib';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

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

  const hiddenPassword = useMemo(() => {
    return '*'.repeat(servicePassword.length);
  }, [servicePassword]);

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
        </div>
      </div>
    </div>
  );
}
