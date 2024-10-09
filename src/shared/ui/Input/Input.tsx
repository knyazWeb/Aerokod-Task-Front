import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1 w-full')}>
        {label && (
          <label
            className={cn('text-sm text-gray-500', {
              'text-red': error,
            })}
          >
            {error || label}
          </label>
        )}
        <input
          className={cn(
            'rounded-lg w-full border border-black py-2 px-4 outline-none' +
              ' focus:border-accentGreen text-base duration-200 ease-in-out transition-all',
            { 'border-red': error },
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

export default Input;
