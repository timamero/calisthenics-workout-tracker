import { Box, Paper, Stack, Text, Title, SimpleGrid } from '@mantine/core';

// ─── Stat card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <Paper radius="md" p="md" bg="lime.0">
      <Text
        fz="xxl"
        fw={700}
        lh="xxs"
        mb={4}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Text>
      <Text fz="xs" c="dark.3" lh="xs">
        {label}
      </Text>
    </Paper>
  );
}

// ─── The foundation ──────────────────────────────────────────────────────────

export default function Foundation() {
  const smallFontSize = { base: 'xxs', md: 'xs' };
  const title2FontSize = { base: 'h2', md: 'display_xs' };

  return (
    <Stack gap="md" mb="xl">
      <Box>
        <Text
          fz={smallFontSize}
          fw={500}
          tt="uppercase"
          c="dark.3"
          mb={6}
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.widest,
          })}
        >
          The foundation
        </Text>
        <Title
          order={2}
          fz={title2FontSize}
          lh="xss"
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
          })}
        >
          The most accessible gym ever built
        </Title>
      </Box>
      <Text fz="sm" c="dark.3" lh="xxl" fw={300}>
        A floor. A pull-up bar. A park bench. That's your gym — free, open 24
        hours, and never crowded.{' '}
        <Text component="span" fw={500} c="var(--mantine-color-text)" inherit>
          Bodyweight training works because physics doesn't care where you are.
        </Text>{' '}
        Gravity applies the same force whether you're in a boutique studio or
        your living room at 6am. Torque helps you harness that force and build a
        real training record from the ground up.
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="sm">
        <StatCard
          value="0"
          label="Equipment required to start training today"
        />
        <StatCard
          value="100+"
          label="Exercises across push, pull, core, and legs"
        />
        <StatCard value="∞" label="Locations you can train — floor optional" />
      </SimpleGrid>
    </Stack>
  );
}
