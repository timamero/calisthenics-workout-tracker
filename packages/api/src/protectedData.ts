export async function getProtectedData(baseUrl: string) {
  const url = `${baseUrl}/protected-route`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Resonse status: $(response.status}`);
    }

    const json = await response.json();
    console.log('Data fethed from FastAPI: ', json);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}