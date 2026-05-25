import { z } from 'zod';
import {
  SetProgressionTypeSchema,
  SetProgressionValueTypeSchema,
  SortDirectionSchema,
  UnitSchema,
} from '../enums.schema';

export const SetProgressionResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: SetProgressionTypeSchema,
  value_type: SetProgressionValueTypeSchema,
  value_options: z
    .string()
    .nullable()
    .transform((val) => (val ? JSON.parse(val) : null)),
  value_int_difficulty_direction: SortDirectionSchema.nullable,
  value_int_unit: UnitSchema.nullable(),
  display_order: z.number(),
  description: z.string().nullable(),
  updated_at: z.nullable(z.date()),
  created_at: z.date().default(() => new Date()),
});

// Reference SQL data for leverages and assists:
// INSERT INTO "public"."leverages_assists" ("id", "created_at", "updated_at", "name", "type", "value_type", "value_options", "value_int_difficulty_direction", "value_int_unit", "display_order", "description") VALUES ('1', '2025-10-09 18:42:45.389275+00', null, 'Ring Height', 'leverage', 'int', null, 'descending', 'ft', '1', 'Height of bottom of ring from the floor.'), ('2', '2025-10-09 18:47:39.100599+00', null, 'Hand width', 'leverage', 'int', null, 'ascending', 'in', '2', 'Distance between hands.'), ('3', '2025-10-09 18:52:35.732229+00', null, 'Lean Angle', 'leverage', 'int', null, 'ascending', 'deg', '3', 'Angle from a horizontal or vertical reference.
// For example, starting in a standard push up position and leaning forward, the angle would be the difference between the current arm position and the starting arm position.'), ('4', '2025-10-09 18:55:01.978878+00', null, 'Resistance Band', 'leverage', 'options', '"{\"Extra Light\",\"Light\",\"Medium\",\"Heavy\",\"Extra Heavy\"]}', null, null, '4', null), ('5', '2025-10-09 20:06:19.592616+00', null, 'Weight', 'leverage', 'int', null, 'ascending', 'lb', '5', null), ('6', '2025-10-09 20:06:48.56541+00', null, 'Weight', 'leverage', 'int', null, 'ascending', 'kg', '6', null), ('7', '2025-10-09 20:08:10.960931+00', null, 'Resistance Band', 'assist', 'options', '"{\"Extra Heavy\",\"Heavy\",\"Medium\",\"Light\",\"Extra Light\"]}', null, null, '7', null), ('8', '2025-10-09 20:09:07.92099+00', null, 'Lean Angle', 'assist', 'int', null, 'descending', null, '8', 'Angle from a horizontal or vertical reference.
// For example, starting in a wall push up position the angle would be the difference between the vertical floor and your body.'), ('11', '2025-10-13 19:33:26.791211+00', null, 'Bar Height', 'leverage', 'int', null, 'descending', 'ft', '9', null), ('12', '2025-10-13 19:34:56.142603+00', null, 'Feet Height', 'leverage', 'int', null, 'ascending', 'in', '11', null), ('13', '2025-10-13 19:37:18.673038+00', null, 'Bench Height', 'assist', 'int', null, 'descending', 'in', '12', null), ('14', '2025-10-13 19:40:33.229207+00', null, 'Distance From Wall', 'assist', 'int', null, 'ascending', 'ft', '13', null);
