import { createContext } from 'react';
import { ServiceI } from '@/entities/Services';

export interface ServicesContextProps {
  services: ServiceI[];
  setServices?: (services: ServiceI[]) => void;
}

export const ServicesContext = createContext<ServicesContextProps>({ services: [] });

export const LOCAL_STORAGE_SERVICES_KEY = 'services';
