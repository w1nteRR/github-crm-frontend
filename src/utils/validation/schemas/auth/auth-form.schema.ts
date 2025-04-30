import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    email: z.string().email({ message: 'Incorrect email' }),
    password: z.string().min(8, { message: 'Min 8 symbols' }),
    confirm_password: z.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password do not match',
    path: ['confirm_password']
  });

export const signInFormSchema = z
  .object({
    email: z.string().email({ message: 'Incorrect email' }),
    password: z.string().min(8, { message: 'Min 8 symbols' })
  });

export type ISignUpFormInput = z.infer<typeof signUpFormSchema>;
export type ISignInFormInput = z.infer<typeof signInFormSchema>;
