import { getExercises as apiGetExercises } from '@cwt/api';
import type { ExerciseResponse } from '@cwt/schema/exercises';
import { sampleExercises } from '@cwt/mocks';

const baseUrl = import.meta.env.VITE_BASE_URL;
const environment = import.meta.env.VITE_ENVIRONMENT || null;

export async function getExercises(token: string): Promise<ExerciseResponse[]> {
  try {
    if (environment === 'local-isolated') {
      console.log('Web: Local environment, return sample exercises.');
      return sampleExercises;
    }
    return await apiGetExercises(baseUrl, token);
  } catch (error) {
    console.error('Web: Error fetching exercises from API:', error);
    throw error;
  }
}
