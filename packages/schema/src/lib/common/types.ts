import { z } from 'zod';
import { AppTypeSchema } from './schemas/enums.schema';

export type AppTypeSchema = z.infer<typeof AppTypeSchema>;
