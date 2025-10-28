import { getLeveragesAssists as apiGetLeveragesAssists } from '@cwt/api';
import type { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';
import { sampleLeveragesAssists } from '@cwt/mocks';

const baseUrl = import.meta.env.VITE_BASE_URL;
const environment = import.meta.env.VITE_ENVIRONMENT || null;

export async function getLeveragesAssists(
  token: string,
): Promise<LeveragesAssistsResponse[]> {
  try {
    if (environment === 'local') {
      console.log(
        'Web: Local environment, return sample leverages and assists.',
      );
      return sampleLeveragesAssists;
    }
    return await apiGetLeveragesAssists(baseUrl, token);
  } catch (error) {
    console.error('Web: Error fetching leverages and assists from API:', error);
    throw error;
  }
}
