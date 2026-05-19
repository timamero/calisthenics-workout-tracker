import { Outlet } from '@tanstack/react-router';
import { AppShell, Group } from '@mantine/core';

import LogoButton from './LogoButton';

export default function SiteLayout() {
  return (
    <AppShell padding="0" header={{ height: 60 }}>
      <AppShell.Header>
        <Group h="100%" px="md">
          <LogoButton linkTo="/" />
        </Group>
      </AppShell.Header>
      <AppShell.Main style={{ display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
