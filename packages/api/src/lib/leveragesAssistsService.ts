import { apiFetch } from './httpClient';
import { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

export function getLeveragesAssists(baseUrl: string, token: string) {
  return apiFetch<LeveragesAssistsResponse[]>(
    baseUrl,
    '/leverages-assists',
    'GET',
    token,
  );
}
