import { Title } from '@mantine/core';
import { useBearStore } from '@cwt/state/counter';
import { User } from '@cwt/schema/sampleSchema';

export const Index = () => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  const user: User = {
    name: 'Jane Doe',
    xp: 100,
  };
  return (
    <div>
      <Title>Welcome Home {user.name}!</Title>
      <p>xp = {user.xp}</p>
      <p>{bears} bears around here</p>
      <button onClick={() => increase(1)}>one up</button>
    </div>
  );
};
