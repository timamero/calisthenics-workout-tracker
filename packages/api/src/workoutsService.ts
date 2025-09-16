import { apiFetch } from './httpClient';
import { WorkoutLog, WorkoutBuildResponse } from '@cwt/schema/workouts';

export function getWorkoutLogs(baseUrl: string, token: string) {
  return apiFetch<WorkoutLog[]>(baseUrl, '/workout/logs', 'GET', token);
}

export async function getWorkoutBuilds(baseUrl: string, token: string) {
  try {
    return await apiFetch<WorkoutBuildResponse[]>(
      baseUrl,
      '/workout/builds',
      'GET',
      token,
    );
  } catch (error) {
    console.error('Web: Error fetching workout builds from API.', error);
    throw error;
  }
}

export function postWorkoutLog(baseUrl: string, token: string, body: BodyInit) {
  return apiFetch<WorkoutLog>(baseUrl, '/workout/log', 'POST', token, body);
}

export async function postWorkoutBuild(
  baseUrl: string,
  token: string,
  body: BodyInit,
) {
  try {
    return await apiFetch<WorkoutBuildResponse>(
      baseUrl,
      '/workout/build',
      'POST',
      token,
      body,
    );
  } catch (error) {
    console.error('Web: Error posting workout to API.', error);
    throw error;
  }
}
