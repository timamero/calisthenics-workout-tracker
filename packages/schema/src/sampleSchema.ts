import * as z from 'zod/v4';

export const User = z.object({
  name: z.string(),
  xp: z.number(),
});

export type User = z.infer<typeof User>;
