import { getSetProgressions as apiGetSetProgressions } from '@cwt/api';
import type { SetProgressionResponse } from '@cwt/schema/setProgressions';
import { sampleSetProgressions } from '@cwt/mocks';

const baseUrl = import.meta.env.VITE_BASE_URL;
const environment = import.meta.env.VITE_ENVIRONMENT || null;

export async function getSetProgressions(
  token: string,
): Promise<SetProgressionResponse[]> {
  try {
    if (environment === 'local-isolated') {
      console.log('Web: Local environment, return sample set progressions.');
      return sampleSetProgressions;
    }
    return await apiGetSetProgressions(baseUrl, token);
  } catch (error) {
    console.error('Web: Error fetching leverages and assists from API:', error);
    throw error;
  }
}
