import { createFileRoute, redirect } from '@tanstack/react-router';

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
