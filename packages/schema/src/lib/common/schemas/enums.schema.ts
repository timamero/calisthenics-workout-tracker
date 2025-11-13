import { z } from 'zod';

export const AppTypeSchema = z.enum(['mobile', 'web']);
