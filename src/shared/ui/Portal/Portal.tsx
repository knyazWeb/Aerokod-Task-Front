import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id: string;
  children: ReactNode;
}

export default function Portal({ id, children }: PortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>();

  useEffect(() => {
    const portalContainer = document.getElementById(id);

    if (!portalContainer) {
      throw new Error('There is no portalContainer container in markup.');
    }

    setContainer(portalContainer);
    return () => setContainer(null);
  }, [id]);

  return container ? createPortal(children, container) : null;
}
