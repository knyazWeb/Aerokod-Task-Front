import { ServiceI } from './servicesApi.types';

export function createService(newService: ServiceI): Promise<ServiceI> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve(newService);
      } else {
        reject(new Error('Error'));
      }
    }, 1000);
  });
}

export function removeService(serviceToDelete: ServiceI): Promise<ServiceI> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve(serviceToDelete);
      } else {
        reject(new Error('Error'));
      }
    }, 1000);
  });
}
