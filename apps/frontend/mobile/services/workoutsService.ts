import {
  getWorkoutBuilds as apiGetWorkoutBuilds,
  postWorkoutBuild as apiPostWorkoutBuild,
  postWorkoutLog as apiPostWorkoutLog,
} from '@cwt/api/workoutsService';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';
import { sampleWorkoutBuilds } from '@cwt/mocks/sampleWorkoutBuilds';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || '';
const environment = process.env.EXPO_PUBLIC_ENVIRONMENT || null;

export async function getWorkoutBuilds(
  token: string,
): Promise<WorkoutBuildResponse[]> {
  if (environment === 'local') {
    console.log('Mobile: Local environment, return sample workout builds.');
    return sampleWorkoutBuilds;
  }
  console.log(
    'Mobile: Full stack development environment, returning builds from database.',
  );
  return apiGetWorkoutBuilds(baseUrl, token);
}

export async function postWorkoutBuild(
  token: string,
  body: BodyInit,
): Promise<WorkoutBuildResponse | null> {
  if (environment === 'local') {
    console.log('Mobile: Local environment, return workout build body.');
    return JSON.parse(body as string);
  }
  console.log(
    'Mobile: Full stack development environment, posting build to database.',
  );
  return apiPostWorkoutBuild(baseUrl, token, body);
}
export async function postWorkoutLog(
  token: string,
  body: BodyInit,
): Promise<WorkoutLogResponse | null> {
  if (environment === 'local') {
    console.log('Mobile: Local environment, return workout log body.');
    return JSON.parse(body as string);
  }
  console.log(
    'Mobile: Full stack development environment, posting log to database.',
  );
  return apiPostWorkoutLog(baseUrl, token, body);
}
