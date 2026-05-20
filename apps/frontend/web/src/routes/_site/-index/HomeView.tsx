import { Container, Stack, Group, Text, Divider } from '@mantine/core';

import Hero from './Hero';
import AlphaNotice from './AlphaNotice';
import WhatsInAlpha from './WhatsInAlpha';
import Foundation from './Foundation';
import Roadmap from './Roadmap';
import CallsToAction from './CallsToAction';

// ─── Main landing page ───────────────────────────────────────────────────────

export default function HomeView() {
  return (
    <Container size="md" pt="xl" pb="md">
      <Stack gap="xl">
        <Hero />

        <AlphaNotice />

        <WhatsInAlpha />

        <Divider />

        <Foundation />

        <Divider />

        <Roadmap />

        <Divider />

        <CallsToAction />

        <Divider />

        <Group>
          <Text
            fz={{ base: 'xxs', md: 'xs' }}
            fw={500}
            c="dark.3"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.wider,
            })}
          >
            &copy;{`${new Date().getFullYear()} Anne Camero Digital Studio`}
          </Text>
        </Group>
      </Stack>
    </Container>
  );
}
