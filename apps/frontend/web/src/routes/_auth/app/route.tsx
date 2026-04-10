import { useEffect } from 'react';
import {
  createFileRoute,
  Outlet,
  Link,
  linkOptions,
} from '@tanstack/react-router';

import { AppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore, useLeveragesAssistsStore } from '@cwt/state/stores';
import type { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

import { getLeveragesAssists } from '../../../services/leveragesAssistsService';

export const Route = createFileRoute('/_auth/app')({
  loader: async () => {
    let leveragesAssists: LeveragesAssistsResponse[] | null = null;

    const leveragesAssistsState =
      useLeveragesAssistsStore.getState().leveragesAssists;
    if (leveragesAssistsState) {
      leveragesAssists = leveragesAssistsState;
    }

    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      if (!leveragesAssists) {
        console.time('fetching LeveragesAssists');
        const fetchedLeveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        console.timeEnd('fetching LeveragesAssists');
        leveragesAssists = fetchedLeveragesAssists;
      }
    }
    return { leveragesAssists };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data: {
    leveragesAssists: LeveragesAssistsResponse[];
  } = Route.useLoaderData();
  const [opened, { toggle }] = useDisclosure();

  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );

  const navLinks = [
    linkOptions({ label: 'Home', to: '/app' }),
    linkOptions({ label: 'Library', to: '/app/library' }),
    linkOptions({ label: 'Past Workouts', to: '/app/history' }),
    linkOptions({ label: 'Profile', to: '/app/user' }),
    linkOptions({ label: 'Settings', to: '/app/settings' }),
  ];
  useEffect(() => {
    setLeveragesAssists(data.leveragesAssists);
  }, [data, setLeveragesAssists]);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            label={link.label}
            component={Link}
            to={link.to}
            onClick={() => opened && toggle()}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
