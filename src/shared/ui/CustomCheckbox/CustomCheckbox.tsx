import { ChangeEvent, forwardRef, ReactNode } from 'react';
import s from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
  label?: ReactNode;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, checked, onChange, disabled, ...props }, ref) => {
    return (
      <label className={s.container}>
        {label}
        <input
          disabled={disabled}
          type='checkbox'
          ref={ref}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <span className={s.checkmark}></span>
      </label>
    );
  },
);
