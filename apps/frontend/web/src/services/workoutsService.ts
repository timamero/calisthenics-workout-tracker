import {
  getWorkoutBuilds as apiGetWorkoutBuilds,
  postWorkoutBuild as apiPostWorkoutBuild,
  getWorkoutLogs as apiGetWorkoutLogs,
  postWorkoutLog as apiPostWorkoutLog,
  deleteWorkoutLog as apiDeleteWorkoutLog,
} from '@cwt/api';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';
import { sampleWorkoutBuilds } from '@cwt/mocks';
import { sampleWorkoutLogs } from '@cwt/mocks';

const baseUrl = import.meta.env.VITE_BASE_URL;
const environment = import.meta.env.VITE_ENVIRONMENT || null;

export async function getWorkoutBuilds(
  token: string,
): Promise<WorkoutBuildResponse[]> {
  if (environment === 'local') {
    console.log('Web: Local environment, return sample workout builds.');
    return sampleWorkoutBuilds;
  }
  console.log(
    'Web: Full stack development environment, returning builds from database.',
  );
  return apiGetWorkoutBuilds(baseUrl, token);
}

export async function postWorkoutBuild(
  token: string,
  body: BodyInit,
): Promise<WorkoutBuildResponse | null> {
  if (environment === 'local') {
    console.log('Web: Local environment, return workout build body.');
    return JSON.parse(body as string);
  }
  return apiPostWorkoutBuild(baseUrl, token, body);
}

export async function getWorkoutLogs(
  token: string,
): Promise<WorkoutLogResponse[]> {
  if (environment === 'local') {
    console.log('Web: Local environment, return sample workout logs.');
    return sampleWorkoutLogs;
  }
  console.log(
    'Web: Full stack development environment, returning logs from database.',
  );
  return apiGetWorkoutLogs(baseUrl, token);
}

export async function postWorkoutLog(
  token: string,
  body: BodyInit,
): Promise<WorkoutLogResponse | null> {
  if (environment === 'local') {
    console.log('Web: Local environment, return workout log body.');
    return JSON.parse(body as string);
  }
  return apiPostWorkoutLog(baseUrl, token, body);
}

export async function deleteWorkoutLog(
  token: string,
  body: BodyInit,
): Promise<WorkoutLogResponse | null> {
  if (environment === 'local') {
    console.log('Web: Local environment, return workout log body.');
    return JSON.parse(body as string);
  }
  return apiDeleteWorkoutLog(baseUrl, token, body);
}
