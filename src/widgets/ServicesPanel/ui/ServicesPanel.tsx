import { useServices } from '@/app/providers/ServicesProvider';
import { ServiceItem } from '@/entities/Services';
import { useMemo } from 'react';

interface ServicesPanelProps {
  searchValue: string;
}

export default function ServicesPanel({ searchValue }: ServicesPanelProps) {
  const { services } = useServices();

  // Что бы не было ненужных перерасчётов (например когда модалка открывается)
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.service.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [services, searchValue]);

  return (
    <section className='p-8'>
      <div className='w-3/4 flex flex-col border-gray-400 border-2 rounded-lg'>
        {filteredServices.length > 0 && (
          <div className='flex justify-between items-center border-b-2 border-gray-400 py-1 px-5 pr-[140px]'>
            <span className='text-gray-600 italic text-lg'>Service name</span>
            <span className='text-gray-600 italic text-lg'>Password</span>
          </div>
        )}
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceItem
              key={service.service}
              serviceName={service.service}
              servicePassword={service.password}
              className='border-b-2 border-gray-400 last:border-b-0 py-4 px-5'
            />
          ))
        ) : (
          <div className='py-4 px-5 text-center text-2xl font-bold'>No services</div>
        )}
      </div>
    </section>
  );
}
