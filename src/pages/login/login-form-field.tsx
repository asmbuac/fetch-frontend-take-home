import type { InputHTMLAttributes } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LoginFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string;
}

const LoginFormField = ({
  name,
  type = 'text',
  error,
  className,
  ...props
}: LoginFormFieldProps) => {
  return (
    <div className="flex flex-col gap-y-1.5">
      <Label htmlFor={name}>Name</Label>
      <Input
        id={name}
        type={type}
        className={cn(
          error &&
            'border-fetch-danger text-fetch-danger focus-visible:ring-fetch-danger/30',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-fetch-danger md:text-sm">{error}</p>}
    </div>
  );
};

export default LoginFormField;
