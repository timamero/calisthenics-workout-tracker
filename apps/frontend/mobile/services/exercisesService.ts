import { getExercises as apiGetExercises } from '@cwt/api';
import { ExerciseResponse } from '@cwt/schema/exercises';
import { sampleExercises } from '@cwt/mocks';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || '';
const environment = process.env.EXPO_PUBLIC_ENVIRONMENT || null;

export async function getExercises(token: string): Promise<ExerciseResponse[]> {
  try {
    if (environment === 'local-isolated') {
      console.log('Mobile: Local environment, return sample exercises.');
      return sampleExercises;
    }
    return await apiGetExercises(baseUrl, token);
  } catch (error) {
    console.error('Mobile: Error fetching exercises from API', error);
    throw error;
  }
}
