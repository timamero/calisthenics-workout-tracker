import { z } from 'zod';

import { WorkoutBase } from './workoutBase.schema';
import { SourceSchema } from './enums.schema';
import { DurationSchema } from '../../common/schemas/duration.schema';

export const WorkoutBuildSchema = z.object({
  ...WorkoutBase.shape,
  user_id: z.optional(z.uuid()),
  duration: z.optional(z.iso.time()),
  source: SourceSchema,
});
