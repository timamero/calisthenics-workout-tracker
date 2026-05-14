import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Image, Text } from '@mantine/core';
import Logo from '../../assets/logo-opt-160x160.svg';
// import { useDisclosure } from '@mantine/hooks';

export const Route = createFileRoute('/_site')({
  component: RouteComponent,
});

function RouteComponent() {
  // const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      padding="md"
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
        <Image radius="md" h={40} w={40} src={Logo} />
        <Text>Torque</Text>
      </AppShell.Header>

      {/* <AppShell.Navbar>Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
