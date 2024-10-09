import { Button, Input } from '@/shared/ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateServiceFormFields } from './CreateServiceForm.types';
import { createService } from '@/entities/Services';
import toast from 'react-hot-toast';
import { useServices } from '@/app/providers/ServicesProvider';
import { ChangeEvent, useEffect, useState } from 'react';
import { CustomCheckbox } from '@/shared/ui/CustomCheckbox/CustomCheckbox.tsx';
import { generatePassword } from '../lib/generatePassword';

interface CreateServiceFormProps {
  closeModalHandler: () => void;
}

export default function CreateServiceForm({ closeModalHandler }: CreateServiceFormProps) {
  // Кастомные состояния для генерации пароля
  const [currentLength, setCurrentLength] = useState<number>(16);
  const [isUseLetters, setIsUseLetters] = useState<boolean>(true);
  const [isUseSymbols, setIsUseSymbols] = useState<boolean>(true);
  const [isUseSpecialCharacters, setIsUseSpecialCharacters] = useState<boolean>(true);
  const [caseOption, setCaseOption] = useState<string>('random');
  const [isOwnPassword, setIsOwnPassword] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  const { createServiceHandler } = useServices();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateServiceFormFields>({
    defaultValues: {
      service: '',
      password: '',
    },
  });

  useEffect(() => {
    const password = generatePassword(
      currentLength,
      isUseLetters,
      isUseSymbols,
      isUseSpecialCharacters,
      caseOption as 'random' | 'lowercase' | 'uppercase',
    );

    if (isOwnPassword) {
      setGeneratedPassword('');
      setValue('password', '');
    }

    if (!isOwnPassword) {
      setGeneratedPassword(password);
      setValue('password', password);
      trigger('password');
    }
  }, [
    currentLength,
    isUseLetters,
    isUseSymbols,
    isUseSpecialCharacters,
    caseOption,
    isOwnPassword,
  ]);

  const onSubmit: SubmitHandler<CreateServiceFormFields> = async (service) => {
    const loadingToastId = toast.loading('Loading...');
    console.log(service.password);
    try {
      const createServiceResponse = await createService(service);
      if (createServiceResponse) {
        createServiceHandler(createServiceResponse);
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
          maxLength: currentLength,
          minLength: currentLength,
        }}
        render={({ field }) => {
          return (
            <Input
              label={'Your current password'}
              type={'text'}
              readOnly={!isOwnPassword}
              maxLength={currentLength}
              // type={'password'}
              placeholder={'password'}
              autoComplete='off'
              error={errors.password?.message}
              value={isOwnPassword ? field.value : generatedPassword}
              onChange={(e) => {
                if (isOwnPassword) {
                  field.onChange(e);
                  setGeneratedPassword(e.currentTarget.value);
                }
              }}
            />
          );
        }}
      />

      <div className='flex flex-col gap-1'>
        <p className='text-sm text-gray-500'>Password length</p>
        <div className='flex gap-5'>
          <input
            className='w-full'
            type='range'
            max={32}
            min={8}
            value={currentLength}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentLength(+e.target.value)
            }
          />
          {currentLength}
        </div>
      </div>

      <div className='flex gap-5'>
        <CustomCheckbox
          disabled={isOwnPassword}
          label='Use letters'
          checked={isUseLetters}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsUseLetters(e.target.checked)
          }
        />
      </div>

      <div className='flex gap-5'>
        <CustomCheckbox
          disabled={isOwnPassword}
          label='Use symbols'
          checked={isUseSymbols}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsUseSymbols(e.target.checked)
          }
        />
      </div>

      <div className='flex gap-5'>
        <CustomCheckbox
          disabled={isOwnPassword}
          label='Use special characters'
          checked={isUseSpecialCharacters}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsUseSpecialCharacters(e.target.checked)
          }
        />
      </div>

      <div className='flex gap-3 items-center'>
        <label htmlFor='case-select'>Выберите регистр:</label>
        <select
          id='case-select'
          className='bg-transparent font-bold'
          value={caseOption}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCaseOption(e.target.value)}
        >
          <option value='random'>Random</option>
          <option value='lowercase'>Lowercase</option>
          <option value='uppercase'>Uppercase</option>
        </select>
      </div>

      <div className='flex gap-5'>
        <CustomCheckbox
          label='Use own password'
          checked={isOwnPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsOwnPassword(e.target.checked)
          }
        />
      </div>

      <Button
        disabled={
          !isValid ||
          isSubmitting ||
          (isOwnPassword && generatedPassword.length !== currentLength)
        }
      >
        Create
      </Button>
    </form>
  );
}
