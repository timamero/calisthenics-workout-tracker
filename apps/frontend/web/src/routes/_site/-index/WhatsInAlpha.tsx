import {
  Box,
  Paper,
  Stack,
  Text,
  Title,
  SimpleGrid,
  ThemeIcon,
} from '@mantine/core';

import {
  IoServerOutline,
  IoLayersOutline,
  IoSwapVertical,
  IoTimeOutline,
} from 'react-icons/io5';

// ─── Feature card ────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      h="100%"
      style={{ border: '1px solid var(--mantine-color-lime-2)' }}
    >
      <Stack gap={8}>
        <ThemeIcon variant="light" color="lime" size="lg" radius="md">
          <Icon size={18} />
        </ThemeIcon>
        <Text fw={500} fz="sm">
          {title}
        </Text>
        <Text fz="xsplus" c="dark.3" lh="lg">
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

// ─── What's in alpha.1 ───────────────────────────────────────────────────────

export default function WhatsInAlpha() {
  const smallFontSize = { base: 'xxs', md: 'xs' };
  const title2FontSize = { base: 'h2', md: 'display_xs' };

  const features = [
    {
      icon: IoServerOutline,
      title: 'Exercise library',
      description:
        '100+ predefined calisthenics exercises — push-ups, pull-ups, dips, squats, core work, and handstand progressions — searchable and ready to log.',
    },
    {
      icon: IoLayersOutline,
      title: 'Workout builder',
      description:
        'Build sessions with exercises, sets, reps, and timed holds. Organise with sections, supersets, and custom ordering.',
    },
    {
      icon: IoSwapVertical,
      title: 'Set progressions',
      description:
        "Track challenge and assist progressions — weighted vests, resistance bands, elevation changes — to log how you're making exercises harder or easier over time.",
    },
    {
      icon: IoTimeOutline,
      title: 'Workout history',
      description:
        'A chronological logbook of your completed sessions. Tap any past workout to review exactly what you did.',
    },
  ];

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
          What's in alpha.1
        </Text>
        <Title
          order={2}
          fz={title2FontSize}
          lh="xxs"
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
          })}
        >
          Everything you need to start training
        </Title>
      </Box>
      <Text fz="sm" c="dark.3" lh="xxl" fw={300}>
        The first release focuses on the fundamentals — a solid exercise
        library, a flexible workout builder, and a logbook to track your
        sessions. The tools that matter most when you're getting started.
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
