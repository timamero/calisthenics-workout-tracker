import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

const IS_PAGE_DISABLED = true;

export const Route = createFileRoute('/_site/about')({
  component: () => {
    if (IS_PAGE_DISABLED) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Under Maintenance</h2>
          <p>This page is temporarily unavailable. Please check back soon!</p>
        </div>
      );
    }

    return <About />;
  },
});

function About() {
  return (
    <div>
      <Title>Hello from About!</Title>
    </div>
  );
}
