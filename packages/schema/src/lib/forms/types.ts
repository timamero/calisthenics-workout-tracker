import { z } from 'zod';

import { AuthSchema, AuthSignUpSchema } from './schemas';

export type Auth = z.infer<typeof AuthSchema>;
export type AuthSignUp = z.infer<typeof AuthSignUpSchema>;

export { AuthSchema, AuthSignUpSchema };
