import { LOCAL_STORAGE_SERVICES_KEY, ServicesContext } from '../lib/ServicesContext';
import { ReactNode, useMemo, useState } from 'react';
import { ServiceI } from '@/entities/Services';

// Состояние при инициализации
const initServicesString = localStorage.getItem(LOCAL_STORAGE_SERVICES_KEY);
const initServices: ServiceI[] = initServicesString ? JSON.parse(initServicesString) : [];

export default function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<ServiceI[]>(initServices);
  const defaultProps = useMemo(
    () => ({
      services: services,
      setServices: setServices,
    }),
    [services],
  );

  return (
    <ServicesContext.Provider value={defaultProps}>{children}</ServicesContext.Provider>
  );
}
