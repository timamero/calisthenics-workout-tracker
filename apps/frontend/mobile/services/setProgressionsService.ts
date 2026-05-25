import { getSetProgressions as apiGetSetProgression } from '@cwt/api';
import type { SetProgressionResponse } from '@cwt/schema/setProgressions';
import { sampleSetProgressions } from '@cwt/mocks';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || '';
const environment = process.env.EXPO_PUBLIC_ENVIRONMENT || null;

export async function getSetProgressions(
  token: string,
): Promise<SetProgressionResponse[]> {
  try {
    if (environment === 'local') {
      console.log('Mobile: Local environment, return sample set progressions.');
      return sampleSetProgressions;
    }
    return await apiGetSetProgression(baseUrl, token);
  } catch (error) {
    console.error('Mobile: Error fetching set progressions from API:', error);
    throw error;
  }
}
