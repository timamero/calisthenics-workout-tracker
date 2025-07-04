import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/settings')({
  component: SettingsView,
});

function SettingsView() {
  return (
    <div>
      <Title>Settings Page</Title>
      <p>This page will contain the app settings.</p>
    </div>
  );
}
