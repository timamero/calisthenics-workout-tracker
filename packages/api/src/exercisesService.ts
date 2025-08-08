export async function getExercises(baseUrl: string, token: string) {
  const url = `${baseUrl}/exercises`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log('Exercises fethed from FastAPI: ', json);
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}