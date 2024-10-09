import { ServiceI } from '@/entities/Services';
import { useContext } from 'react';
import { LOCAL_STORAGE_SERVICES_KEY, ServicesContext } from './ServicesContext';

interface UseServicesResult {
  services: ServiceI[];
  servicesHandler: (service: ServiceI) => void;
}

export default function useServices(): UseServicesResult {
  const { services, setServices } = useContext(ServicesContext);

  const servicesHandler = (service: ServiceI) => {
    if (services && setServices) {
      const updatedServices = [...services];
      const existingServiceIndex = updatedServices.findIndex(
        (s) => s.service === service.service,
      );

      if (existingServiceIndex !== -1) {
        updatedServices[existingServiceIndex] = service;
      } else {
        updatedServices.push(service);
      }
      
      localStorage.setItem(LOCAL_STORAGE_SERVICES_KEY, JSON.stringify(updatedServices));
      setServices(updatedServices);
    }
  };

  return { services, servicesHandler };
}
