import { Button } from '@/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useServices } from '@/app/providers/ServicesProvider';
import toast from 'react-hot-toast';

import { removeService, ServiceI } from '@/entities/Services';

interface RemoveServiceFormProps {
  service: ServiceI;
  closeModalHandler: () => void;
}

// eslint-disable-next-line
type RemoveServiceFormFields = {};

export default function RemoveServiceForm({
  service,
  closeModalHandler,
}: RemoveServiceFormProps) {
  const { removeServiceHandler } = useServices();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RemoveServiceFormFields>();

  const onSubmit: SubmitHandler<RemoveServiceFormFields> = async () => {
    const loadingToastId = toast.loading('Removing...');
    try {
      const removeServiceResponse = await removeService(service);
      if (removeServiceResponse) {
        removeServiceHandler(removeServiceResponse.service);
        toast.success('Service removed successfully');
      }
    } catch {
      toast.error("Service didn't remove successfully");
    } finally {
      toast.dismiss(loadingToastId);
      closeModalHandler();
    }
  };

  return (
    <form
      className='flex flex-col items-center justify-center gap-5 w-[350px] py-5 px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className='text-center'>
        Do you want to delete <br />{' '}
        <span className='font-bold text-lg'>{service.service}</span> service?
      </p>

      <div className='flex w-full items-center gap-5'>
        <Button
          type='button'
          disabled={isSubmitting}
          onClick={closeModalHandler}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting}>Delete</Button>
      </div>
    </form>
  );
}
