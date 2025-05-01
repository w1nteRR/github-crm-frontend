import * as React from 'react';
import { Link, useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoutesPaths } from '@/navigation/routes.enum.ts';
import { ISignUpFormInput, signUpFormSchema } from '@/utils/validation/schemas/auth/auth-form.schema.ts';
import { useAuthContext } from '@/hooks/auth/useAuthContext.ts';

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpFormInput>({
    resolver : zodResolver (signUpFormSchema)
  });

  const onSubmit: SubmitHandler<ISignUpFormInput> = async (data) => {
    try {
      await signUp(data);

      navigate(RoutesPaths.SignIn);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
          <CardDescription>
            Enter your email and password below to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  required
                />
                {errors.password && <span className='text-xs text-red-700'>{errors.password.message}</span>}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirm password</Label>
                </div>
                <Input
                  {...register('confirm_password')}
                  id="confirm_password"
                  type="password"
                  required
                />
                {errors.confirm_password && <span className='text-xs text-red-700'>{errors.confirm_password.message}</span>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to={RoutesPaths.SignIn} className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
