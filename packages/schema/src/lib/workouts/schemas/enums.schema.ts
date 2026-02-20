import { z } from 'zod';

import { Constants } from '../../common/database.types';

const constants = Constants.public.Enums;

export const GoalSchema = z.enum(constants.goal);
export const SourceSchema = z.enum(constants.source);
export const StatusSchema = z.enum(constants.status);
export const TrackingTypeSchema = z.enum(constants.tracking_type);
export const ModeSchema = z.enum(['build', 'edit', 'log', 'read']);
