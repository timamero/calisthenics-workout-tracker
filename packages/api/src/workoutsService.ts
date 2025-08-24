import { apiFetch } from "./httpClient";
import { WorkoutLog, WorkoutBuild } from "@cwt/schema/workouts";

export function getWorkoutLogs(baseUrl: string, token: string) {
  return apiFetch<WorkoutLog[]>(baseUrl, "/workout/logs", "GET", token);
}

export function getWorkoutBuilds(baseUrl: string, token: string) {
  return apiFetch<WorkoutBuild[]>(baseUrl, "/workout/builds", "GET", token);
}

export function postWorkoutLog(baseUrl: string, token: string) {
  return apiFetch<WorkoutLog[]>(baseUrl, "/workout/log", "POST", token);
}
