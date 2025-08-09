import { getExercises as apiGetExercises } from '@cwt/api/exercisesService';
import { Exercise } from '@cwt/schema/exerciseSchema';
import { sampleExercises } from '@cwt/mocks/sampleExercises';

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getExercises(token: string): Promise<Exercise[]> {
  try {
    return await apiGetExercises(baseUrl, token);
  } catch {
    console.log(
      'Web: API not available, return sample exercises for development.',
    );
    return sampleExercises;
  }
}
