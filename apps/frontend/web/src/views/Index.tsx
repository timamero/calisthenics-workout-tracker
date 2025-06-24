import { Title } from '@mantine/core';
import { useBearStore } from '@cwt/state/counter';

export const Index = () => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  return (
    <div>
      <Title>Welcome Home!</Title>
      <p>This application is in a container.</p>
      <p>{bears} bears around here</p>
      <button onClick={() => increase(1)}>one up</button>
    </div>
  );
};
