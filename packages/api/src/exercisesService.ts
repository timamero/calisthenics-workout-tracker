import { apiFetch } from './httpClient';
import { ExerciseResponse } from '@cwt/schema/exercises';

export function getExercises(baseUrl: string, token: string) {
  return apiFetch<ExerciseResponse[]>(baseUrl, '/exercises', 'GET', token);
}
