import { apiFetch } from './httpClient';
import { WorkoutLog, WorkoutBuildResponse } from '@cwt/schema/workouts';

export function getWorkoutLogs(baseUrl: string, token: string) {
  try {
    return apiFetch<WorkoutLog[]>(baseUrl, '/workout/logs', 'GET', token);
  } catch (error) {
    console.error('Error fetching workout logs from API.', error);
    throw error;
  }
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
    console.error('Error fetching workout builds from API.', error);
    throw error;
  }
}

export function postWorkoutLog(baseUrl: string, token: string, body: BodyInit) {
  try {
    return apiFetch<WorkoutLog>(baseUrl, '/workout/log', 'POST', token, body);
  } catch (error) {
    console.error('Error posting workou log to API.', error);
    throw error;
  }
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
    console.error('Error posting workout to API.', error);
    throw error;
  }
}
