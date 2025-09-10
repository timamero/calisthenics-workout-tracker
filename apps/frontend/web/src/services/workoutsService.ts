import { getWorkoutBuilds as apiGetWorkoutBuilds } from '@cwt/api/workoutsService';
import type { WorkoutBuildResponse } from '@cwt/schema/workouts';
import { sampleWorkoutBuilds } from '@cwt/mocks/sampleWorkoutBuilds';

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getWorkoutBuilds(
  token: string,
): Promise<WorkoutBuildResponse[]> {
  try {
    return await apiGetWorkoutBuilds(baseUrl, token);
  } catch {
    console.log(
      'Web: API not available, return sample workoutbuilds for development.',
    );
    return sampleWorkoutBuilds;
  }
}
