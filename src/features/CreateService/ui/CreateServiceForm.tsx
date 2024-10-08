import { Button, Input } from '@/shared/ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateServiceFormFields } from './CreateServiceForm.types';

export default function CreateServiceForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateServiceFormFields>({
    defaultValues: {
      service: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<CreateServiceFormFields> = async (data) => {
    console.log(data);
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
            type={'password'}
            placeholder={'password'}
            error={errors.password?.message}
            autoComplete={'off'}
            {...field}
          />
        )}
      />

      <Button disabled={!isValid}>Create</Button>
    </form>
  );
}
