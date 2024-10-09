import { useServices } from '@/app/providers/ServicesProvider';
import { ServiceItem } from '@/entities/Services';

export default function ServicesPanel() {
  const { services } = useServices();
  return (
    <section className='p-8'>
      <div className='w-3/4 flex flex-col border-gray-400 border-2 rounded-lg'>
        <div className='flex justify-between items-center border-b-2 border-gray-400 py-1 px-5'>
          <span>Service name</span>
          <span>Password</span>
        </div>
        {services.length > 0 &&
          services.map((service) => (
            <ServiceItem
              key={service.service}
              serviceName={service.service}
              servicePassword={service.password}
              className='border-b-2 border-gray-400 last:border-b-0 py-4 px-5'
            />
          ))}
      </div>
    </section>
  );
}
