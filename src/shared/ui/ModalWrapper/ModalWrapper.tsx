import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortalContainer } from '@/shared/lib';
import { Portal } from '@/shared/ui';
import { v4 as uuidv4 } from 'uuid';

const MODAL_CONTAINER_ID = `modal-container-${uuidv4()}`;

interface ModalProps {
  children: ReactNode;
  closeHandler: () => void;
}

export default function ModalWrapper({ children, closeHandler }: ModalProps) {
  const [isMounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createPortalContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        closeHandler();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeHandler();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [closeHandler]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div
        className='fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-modalOverlay'
        ref={rootRef}
      >
        <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-white py-4 px-6 rounded-xl'>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
}
