import * as z from 'zod';

export const AuthSchema = z.object({
  email: z.email().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(4, { message: 'The username must be 4 characters or more' })
    .max(16, { message: 'The password must be 16 characters or less' }),
});
