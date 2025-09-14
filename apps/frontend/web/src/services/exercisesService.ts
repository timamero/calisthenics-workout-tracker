import { getExercises as apiGetExercises } from '@cwt/api/exercisesService';
import type { ExerciseResponse } from '@cwt/schema/exercises';
import { sampleExercises } from '@cwt/mocks/sampleExercises';

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getExercises(token: string): Promise<ExerciseResponse[]> {
  try {
    return await apiGetExercises(baseUrl, token);
  } catch {
    console.error(
      'Web: API not available, return sample exercises for development.',
    );
    return sampleExercises;
  }
}
