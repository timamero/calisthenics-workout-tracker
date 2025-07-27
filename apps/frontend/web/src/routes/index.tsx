import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

import { useBearStore } from '@cwt/state/counter';
import { User } from '@cwt/schema/sampleSchema';
import { getData } from '@cwt/api/projectData';

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
    const baseUrl = 'http://127.0.0.1:8000';
    getData(baseUrl);
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
