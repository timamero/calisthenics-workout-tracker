import {
  getWorkoutBuilds as apiGetWorkoutBuilds,
  postWorkoutBuild as apiPostWorkoutBuild,
} from '@cwt/api/workoutsService';
import type { WorkoutBuildResponse } from '@cwt/schema/workouts';
import { sampleWorkoutBuilds } from '@cwt/mocks/sampleWorkoutBuilds';

const baseUrl = import.meta.env.VITE_BASE_URL;
const environment = import.meta.env.VITE_ENVIRONMENT || null;

export async function getWorkoutBuilds(
  token: string,
): Promise<WorkoutBuildResponse[]> {
  if (environment === 'local') {
    console.log('Web: Local environment, return sample workout builds.');
    return sampleWorkoutBuilds;
  }
  return await apiGetWorkoutBuilds(baseUrl, token);
}

export async function postWorkoutBuild(
  token: string,
  body: BodyInit,
): Promise<WorkoutBuildResponse | null> {
  if (environment === 'local') {
    console.log('Web: Local environment, return workout build body.');
    return JSON.parse(body as string);
  }
  return await apiPostWorkoutBuild(baseUrl, token, body);
}
