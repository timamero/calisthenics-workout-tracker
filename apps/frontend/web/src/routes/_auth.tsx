import { createFileRoute, redirect } from '@tanstack/react-router';
// import { Title, Stack, Text } from '@mantine/core';
import { useAuthStore } from '@cwt/state/stores';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
});
