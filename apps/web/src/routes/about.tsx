import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
    const [opened, { toggle }] = useDisclosure();
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <div>Logo</div>
        </AppShell.Header>
  
        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
  
        <AppShell.Main>Hello from About</AppShell.Main>
      </AppShell>
    )
}