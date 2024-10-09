import { useServices } from '@/app/providers/ServicesProvider';

export default function ServicesPanel() {
  const { services } = useServices();
  return (
    <section>
      <div>
        {services.length > 0 &&
          services.map((service) => (
            <div key={service.service}>
              {service.service} {service.password}
            </div>
          ))}
      </div>
    </section>
  );
}
