import {
  Box,
  Paper,
  Stack,
  Text,
  Title,
  SimpleGrid,
  Badge,
} from '@mantine/core';

// ─── Roadmap card ────────────────────────────────────────────────────────────

function RoadmapCard({
  version,
  title,
  description,
  isCurrent,
}: {
  version: string;
  title: string;
  description: string;
  isCurrent: boolean;
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      h="100%"
      style={
        isCurrent
          ? { borderWidth: 2, borderColor: 'var(--mantine-color-lime-2)' }
          : {}
      }
    >
      <Stack gap={6}>
        {isCurrent ? (
          <Badge
            color="dark"
            bg="lime.2"
            variant="light"
            size="xs"
            radius="xl"
            w="fit-content"
          >
            Now — {version}
          </Badge>
        ) : (
          <Text
            fz="xxs"
            fw={500}
            tt="uppercase"
            c="dark.3"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.wider,
            })}
          >
            Coming — {version}
          </Text>
        )}
        <Text fw={500} fz="sm">
          {title}
        </Text>
        <Text fz="xs" c="dark.3" lh="lg">
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

// ─── Roadmap ─────────────────────────────────────────────────────────────────

export default function Roadmap() {
  const roadmap = [
    {
      version: 'alpha.1',
      title: 'Core logging',
      description:
        'Exercise library, workout builder, set progressions, supersets, and workout history.',
      isCurrent: true,
    },
    {
      version: 'alpha.2',
      title: 'Progressions library',
      description:
        'Predefined skill progressions — pull-up, pistol squat, front lever — with structured exercise paths. Plus onboarding, profile, and a calendar logbook view.',
      isCurrent: false,
    },
    {
      version: 'alpha.3',
      title: 'Progression tracking',
      description:
        "See your progress through each skill progression — completed steps, current exercises, and how far you've come.",
      isCurrent: false,
    },
    {
      version: 'alpha.4',
      title: 'AI workout generator',
      description:
        'Personalised workouts generated from your goals, fitness level, and available equipment — powered by AI.',
      isCurrent: false,
    },
  ];

  return (
    <Stack gap="md" mb="xl">
      <Box>
        <Text
          fz={{ base: 'xxs', md: 'xs' }}
          fw={500}
          tt="uppercase"
          c="dark.3"
          mb={6}
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.widest,
          })}
        >
          What's coming
        </Text>
        <Title
          order={2}
          fz={{ base: 'h2', md: 'display_xs' }}
          lh="xxs"
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
          })}
        >
          The roadmap
        </Title>
      </Box>
      <Text fz="sm" c="dark.3" lh="xxl" fw={300}>
        Alpha.1 is the starting line. Here's where Torque is headed.
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
        {roadmap.map((r) => (
          <RoadmapCard key={r.version} {...r} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
