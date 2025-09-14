import { getExercises as apiGetExercises } from '@cwt/api/exercisesService';
import { Exercise } from '@cwt/schema/exercises';
import { sampleExercises } from '@cwt/mocks/sampleExercises';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || '';

export async function getExercises(token: string): Promise<Exercise[]> {
  try {
    return await apiGetExercises(baseUrl, token);
  } catch {
    console.error(
      'Mobile: API not available, return sample exercises for development.',
    );
    return sampleExercises;
  }
}
