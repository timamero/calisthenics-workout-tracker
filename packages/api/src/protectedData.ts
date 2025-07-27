export async function getProtectedData(baseUrl: string, token: string) {
  const url = `${baseUrl}/protected-route`;
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
      throw new Error(`Resonse status: $(response.status}`);
    }

    const json = await response.json();
    console.log('Protected data fethed from FastAPI: ', json);
  } catch (error) {
    console.error('Error fetching protected data:', error);
  }
}
