import { Button, Input } from '@/shared/ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateServiceFormFields } from './CreateServiceForm.types';
import { createService } from '@/entities/Services';
import toast from 'react-hot-toast';
import { useServices } from '@/app/providers/ServicesProvider';

interface CreateServiceFormProps {
  closeModalHandler: () => void;
}

export default function CreateServiceForm({ closeModalHandler }: CreateServiceFormProps) {
  const { servicesHandler } = useServices();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateServiceFormFields>({
    defaultValues: {
      service: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<CreateServiceFormFields> = async (service) => {
    const loadingToastId = toast.loading('Loading...');
    try {
      const createServiceResponse = await createService(service);
      if (createServiceResponse) {
        servicesHandler(createServiceResponse);
        toast.success('Service added successfully');
      }
    } catch {
      toast.error("Service didn't add successfully");
    } finally {
      toast.dismiss(loadingToastId);
      closeModalHandler();
    }
  };

  return (
    <form
      className='flex flex-col gap-5 w-[350px] pt-5 pb-8 px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='service'
        control={control}
        rules={{
          required: 'Fill the field',
        }}
        render={({ field }) => (
          <Input
            label={'Write a service name'}
            type={'text'}
            placeholder={'google'}
            error={errors.service?.message}
            {...field}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        rules={{
          required: 'Fill the field',
        }}
        render={({ field }) => (
          <Input
            label={'Create a password'}
            type={'text'}
            // type={'password'}
            placeholder={'password'}
            autoComplete='off'
            error={errors.password?.message}
            {...field}
          />
        )}
      />

      <Button disabled={!isValid || isSubmitting}>Create</Button>
    </form>
  );
}
