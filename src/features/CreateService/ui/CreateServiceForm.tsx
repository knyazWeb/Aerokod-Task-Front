import { Button, Input } from '@/shared/ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateServiceFormFields } from './CreateServiceForm.types';
import { createService } from '@/entities/Services';
import toast from 'react-hot-toast';
import { useServices } from '@/app/providers/ServicesProvider';
import { ChangeEvent, useEffect, useState } from 'react';
import { CustomCheckbox } from '@/shared/ui/CustomCheckbox/CustomCheckbox.tsx';
import { generatePassword } from '../lib/generatePassword';
import { checkUniqueSymbols } from '../lib/checkUniqueSymbols.ts';

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
  const [isOwnSymbols, setIsOwnSymbols] = useState<boolean>(false);
  const [symbolsInputValue, setSymbolsInputValue] = useState<string>('');

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
      isOwnSymbols ? symbolsInputValue : null,
    );
    setValue('password', password);
    trigger('password');
  }, [
    currentLength,
    isUseLetters,
    isUseSymbols,
    isUseSpecialCharacters,
    caseOption,
    isOwnSymbols,
    symbolsInputValue,
  ]);

  const onSubmit: SubmitHandler<CreateServiceFormFields> = async (service) => {
    const loadingToastId = toast.loading('Loading...');
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
              readOnly={true}
              maxLength={currentLength}
              // type={'password'}
              placeholder={'password'}
              autoComplete='off'
              error={errors.password?.message}
              {...field}
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
          disabled={isOwnSymbols}
          label='Use letters'
          checked={isUseLetters}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsUseLetters(e.target.checked)
          }
        />
      </div>

      <div className='flex gap-5'>
        <CustomCheckbox
          disabled={isOwnSymbols}
          label='Use symbols'
          checked={isUseSymbols}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsUseSymbols(e.target.checked)
          }
        />
      </div>

      <div className='flex gap-5'>
        <CustomCheckbox
          disabled={isOwnSymbols}
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
          disabled={isOwnSymbols}
          className='bg-transparent font-bold disabled:text-gray-400'
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
          label='Use own symbols'
          checked={isOwnSymbols}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsOwnSymbols(e.target.checked)
          }
        />
      </div>

      {isOwnSymbols && (
        <Input
          value={symbolsInputValue}
          placeholder='Custom symbols'
          label='Write unique symbols'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (checkUniqueSymbols(value)) {
              setSymbolsInputValue(value);
            }
          }}
          type={'text'}
        />
      )}

      <Button disabled={!isValid || isSubmitting}>Create</Button>
    </form>
  );
}
