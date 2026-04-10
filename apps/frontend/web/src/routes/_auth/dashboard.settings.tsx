import { createFileRoute } from '@tanstack/react-router';
import { Text } from '@mantine/core';

export const Route = createFileRoute('/_auth/dashboard/settings')({
  component: SettingsView,
});

export function SettingsView() {
  return <Text size="xl">This is the authenticated settings route</Text>;
}
