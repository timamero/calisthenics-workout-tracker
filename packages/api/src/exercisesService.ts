import { apiFetch } from "./httpClient";
import { Exercise } from "@cwt/schema/exerciseSchema";

export function getExercises (baseUrl: string, token: string) {
  return apiFetch<Exercise[]>(baseUrl, '/exercises', token)
}

// export async function getExercises(baseUrl: string, token: string): Promise<Exercise[] | void> {
//   const url = `${baseUrl}/exercises`;
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: headers
//     });
//     if (!response.ok) {
//       throw new Error(`API Package: Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log('API Package: Exercises fethed from FastAPI: ', json);
//     return json
//   } catch (error) {
//     console.error('API Package: Error fetching exercises:', error);
//   }
// }