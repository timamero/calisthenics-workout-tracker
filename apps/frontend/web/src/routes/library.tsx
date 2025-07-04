import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  return (
    <div>
      <Title>Library Page</Title>
      <p>
        This page will be the hub for exercises, progressions and progression
        exercises.
      </p>
    </div>
  );
}
