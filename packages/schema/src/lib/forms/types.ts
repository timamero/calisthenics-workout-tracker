import { z } from 'zod';

import { AuthSchema } from './schemas';

export type Auth = z.infer<typeof AuthSchema>;
