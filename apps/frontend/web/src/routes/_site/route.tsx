import { createFileRoute } from '@tanstack/react-router';
// import {
//   AppShell,
//   Image,
//   Text,
//   UnstyledButton,
//   Group,
//   Box,
// } from '@mantine/core';
// import Logo from '../../assets/logo-min-opt-160x160.svg';
import SiteLayout from '../../components/layouts/SiteLayout';
// import { useDisclosure } from '@mantine/hooks';

export const Route = createFileRoute('/_site')({
  component: RouteComponent,
});

function RouteComponent() {
  // const [opened, { toggle }] = useDisclosure();
  return (
    <SiteLayout />
    // <AppShell
    //   padding="md"
    //   header={{ height: 60 }}
    //   // navbar={{
    //   //   width: 300,
    //   //   breakpoint: 'sm',
    //   //   collapsed: { mobile: !opened },
    //   // }}
    // >
    //   <AppShell.Header>
    //     {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}

    //     {/* <div>Logo</div> */}
    //     <Group h="100%" px="xl">
    //       <UnstyledButton component={Link} to="/">
    //         <Group gap={8}>
    //           <Box bg="white" p="xs" bdrs={32}>
    //             <Image
    //               radius="md"
    //               w={24}
    //               style={{ aspectRatio: 0.92 }}
    //               src={Logo}
    //             />
    //           </Box>
    //           <Text ff="heading" fw="bolder" size="xl">
    //             Torque
    //           </Text>
    //         </Group>
    //       </UnstyledButton>
    //     </Group>
    //   </AppShell.Header>

    //   {/* <AppShell.Navbar>Navbar</AppShell.Navbar> */}

    //   <AppShell.Main>
    //     <Outlet />
    //   </AppShell.Main>
    // </AppShell>
  );
}
