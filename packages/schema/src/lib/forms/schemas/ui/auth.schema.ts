import * as z from 'zod';

export const AuthSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(4, { message: 'The password must be 4 characters or more' })
    .max(48, { message: 'The password must be 48 characters or less' }),
});

export const AuthSignUpSchema = z
  .object({
    ...AuthSchema.shape,
    username: z
      .string()
      .min(4, { message: 'The username must be 4 characters or more' })
      .max(24, {
        message: 'The username must be 24 characters or less',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
