import { apiFetch } from "./httpClient";
import { Exercise } from "@cwt/schema/exerciseSchema";

export function getExercises (baseUrl: string, token: string) {
  return apiFetch<Exercise[]>(baseUrl, '/exercises', token)
}
