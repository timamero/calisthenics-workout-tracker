import { getExercises as apiGetExercises } from '@cwt/api/exercisesService';
import { Exercise } from '@cwt/schema/exerciseSchema';
import { sampleExercises } from '@cwt/mocks/sampleExercises';

const baseUrl = 'http://REDACTED_IP:8000';

export async function getExercises(token: string): Promise<Exercise[]> {
  try {
    return await apiGetExercises(baseUrl, token);
  } catch {
    console.log(
      'Mobile: API not available, return sample exercises for development.',
    );
    return sampleExercises;
  }
}
