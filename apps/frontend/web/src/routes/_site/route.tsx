import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { AppShell, Image, Text, UnstyledButton, Group } from '@mantine/core';
import Logo from '../../assets/logo-min-opt-160x160.svg';
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
        <Group bg="lime.2" h="100%" px="xl">
          <UnstyledButton component={Link} to="/">
            <Group>
              <Image
                radius="md"
                w={24}
                style={{ aspectRatio: 0.92 }}
                src={Logo}
              />
              <Text ff="heading" fw="bolder" size="xl">
                Torque
              </Text>
            </Group>
          </UnstyledButton>
        </Group>
      </AppShell.Header>

      {/* <AppShell.Navbar>Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
