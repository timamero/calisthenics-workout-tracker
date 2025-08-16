import { apiFetch } from "./httpClient";
import { Exercise } from "@cwt/schema/exercises";

export function getExercises (baseUrl: string, token: string) {
  return apiFetch<Exercise[]>(baseUrl, '/exercises', 'GET', token)
}
