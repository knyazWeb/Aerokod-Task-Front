import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'w-full bg-accentGreen px-5 py-2 text-white text-base' +
          ' disabled:bg-gray-300 disabled:text-gray-600' +
          ' rounded-lg duration-200 ease-in-out transition-all',
        className,
      )}
    >
      {children}
    </button>
  );
}
