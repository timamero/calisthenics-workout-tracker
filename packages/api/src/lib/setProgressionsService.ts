import { apiFetch } from './httpClient';
import { SetProgressionResponse } from '@cwt/schema/setProgressions';

export function getSetProgressions(baseUrl: string, token: string) {
  return apiFetch<SetProgressionResponse[]>(
    baseUrl,
    '/set-progressions',
    'GET',
    token,
  );
}
