import { Outlet } from '@tanstack/react-router';
import { AppShell, Group } from '@mantine/core';

// import Logo from '../../assets/logo-min-opt-160x160.svg';
import LogoButton from './LogoButton';
// import classes from './SiteLayout.module.css';

export default function SiteLayout() {
  // const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      padding="0"
      header={{ height: 60 }}
      // navbar={{
      //   width: 300,
      //   breakpoint: 'sm',
      //   collapsed: { mobile: !opened },
      // }}
    >
      <AppShell.Header>
        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}

        {/* <div>Logo</div> */}
        <Group h="100%" px="md">
          <LogoButton linkTo="/" />
        </Group>
      </AppShell.Header>

      {/* <AppShell.Navbar>Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
