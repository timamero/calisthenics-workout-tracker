import { apiFetch } from "./httpClient";
import { WorkoutLog, WorkoutBuild } from "@cwt/schema/workouts";

export function getWorkoutLogs(baseUrl: string, token: string) {
  return apiFetch<WorkoutLog[]>(baseUrl, "/workout/logs", "GET", token);
}

export function getWorkoutBuilds(baseUrl: string, token: string) {
  return apiFetch<WorkoutBuild[]>(baseUrl, "/workout/builds", "GET", token);
}

export function postWorkoutLog(baseUrl: string, token: string, body: BodyInit) {
  return apiFetch<WorkoutLog>(baseUrl, "/workout/log", "POST", token, body);
}

export function postWorkoutBuild(
  baseUrl: string,
  token: string,
  body: BodyInit
) {
  return apiFetch<WorkoutBuild>(baseUrl, "/workout/build", "POST", token, body);
}
