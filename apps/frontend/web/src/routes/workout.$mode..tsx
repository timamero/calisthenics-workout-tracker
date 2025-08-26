import { createFileRoute } from '@tanstack/react-router';

import { useStore } from '@cwt/state/store';

export const Route = createFileRoute('/workout/$mode/')({
  component: WorkoutView,
});

function WorkoutView() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  if (mode === null) {
    setMode('build');
  }
  return <div>Hello "/workout"!</div>;
}
