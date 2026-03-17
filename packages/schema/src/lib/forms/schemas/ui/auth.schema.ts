import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const AuthSignUpSchema = z
  .object({
    ...AuthSchema.shape,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
