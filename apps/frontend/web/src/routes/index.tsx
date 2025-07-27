import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';
import { useBearStore } from '@cwt/state/counter';
import { User } from '@cwt/schema/sampleSchema';

export const Route = createFileRoute('/')({
  component: HomeView,
});

function HomeView() {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  const user: User = {
    name: 'Jane Doe',
    xp: 100,
  };

  useEffect(() => {
    console.log('Fetching data from public route...');
    getData();
  }, []);

  return (
    <div>
      <Title>Welcome Home {user.name}!</Title>
      <p>xp = {user.xp}</p>
      <p>{bears} bears around here</p>
      <button onClick={() => increase(1)}>one up</button>
    </div>
  );
}

async function getData() {
  const url = 'http://127.0.0.1:8000/info';
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
