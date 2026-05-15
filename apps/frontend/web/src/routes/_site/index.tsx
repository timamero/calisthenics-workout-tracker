import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Container,
  Stack,
  Group,
  Box,
  Text,
  Title,
  Badge,
  Paper,
  SimpleGrid,
  Divider,
  Alert,
  ThemeIcon,
  Button,
} from '@mantine/core';

import {
  IoInformationCircleOutline,
  IoSwapVertical,
  IoTimeOutline,
  IoServerOutline,
  IoLayersOutline,
  IoLogoGooglePlaystore,
} from 'react-icons/io5';

export const Route = createFileRoute('/_site/')({
  component: HomeView,
});

// ─── Physics callout ────────────────────────────────────────────────────────

function PhysicsCallout() {
  const lines = [
    { eq: 'τ = r × F', label: 'torque = moment arm × force' },
    { eq: 'F = mg', label: 'force = mass × gravity' },
    { eq: 'You = F', label: 'you are the load' },
  ];
  return (
    <Stack gap={12} align="flex-end">
      {lines.map(({ eq, label }) => (
        <Box key={eq} ta="right">
          <Text ff="monospace" fz={13} fw={600} lts="0.1em" c="dark.4" lh={1}>
            {eq}
          </Text>
          <Text fz={10} fw={400} lts="0.06em" c="dark.3" lh={1.4}>
            {label}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}

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
      bg="elevation.3"
      style={{ border: '1px solid var(--mantine-color-lime-2)' }}
    >
      <Stack gap={8}>
        <ThemeIcon variant="light" color="lime" size="lg" radius="md">
          <Icon size={18} />
        </ThemeIcon>
        <Text fw={500} fz={14}>
          {title}
        </Text>
        <Text fz={13} c="dark.3" lh={1.6}>
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

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
          <Text fz={10} fw={500} lts="0.1em" tt="uppercase" c="dark.3">
            Coming — {version}
          </Text>
        )}
        <Text fw={500} fz={14}>
          {title}
        </Text>
        <Text fz={12} c="dark.3" lh={1.55}>
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

// ─── Stat card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <Paper radius="md" p="md" bg="lime.0">
      <Text
        fz={36}
        fw={700}
        lh={1}
        mb={4}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Text>
      <Text fz={12} c="dimmed" lh={1.4}>
        {label}
      </Text>
    </Paper>
  );
}

// ─── Main landing page ───────────────────────────────────────────────────────

function HomeView() {
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
    <Container size="md" pt="xl">
      <Stack gap="xl">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <Paper withBorder radius="lg" p="xl" bg="elevation.3" mb="xl">
          <Stack gap="lg">
            <Group justify="flex-end" align="center" wrap="wrap" gap="sm">
              <Group gap="xs" wrap="wrap">
                <Badge
                  ff="monospace"
                  color="violet.9"
                  bg="violet.0"
                  variant="light"
                  size="sm"
                  radius="xl"
                >
                  Early Access — v0.1.0-alpha.1
                </Badge>
                <Badge
                  ff="monospace"
                  color="dark.4"
                  variant="light"
                  size="sm"
                  radius="xl"
                >
                  Calisthenics
                </Badge>
                <Badge
                  ff="monospace"
                  color="dark.4"
                  variant="light"
                  size="sm"
                  radius="xl"
                >
                  Bodyweight
                </Badge>
              </Group>
            </Group>

            {/* Wordmark + physics */}
            <Group
              align="flex-end"
              justify="space-between"
              gap="xl"
              wrap="wrap"
            >
              <Box>
                <Title
                  order={1}
                  fz={{ base: 72, sm: 100 }}
                  lh={0.88}
                  lts="0.02em"
                  mb={8}
                >
                  Torque.
                </Title>
                <Text
                  fz={{ base: 20, sm: 28 }}
                  fw={700}
                  lts="0.06em"
                  tt="uppercase"
                  c="dark.2"
                >
                  Generate force.{' '}
                  <Text component="span" c="var(--mantine-color-text)" inherit>
                    Anywhere.
                  </Text>
                </Text>
              </Box>
              <PhysicsCallout />
            </Group>

            {/* Intro */}
            <Text fz={14} c="dark.3" lh={1.8} maw={520} fw={300}>
              Calisthenics is physics made personal. Every pull-up, dip, and
              push-up is your body generating rotational force —{' '}
              <Text
                component="span"
                fw={500}
                c="var(--mantine-color-text)"
                inherit
              >
                torque
              </Text>{' '}
              — against gravity, with nothing but your own mass as the load.
              Torque is the app built for that. Log your workouts, track your
              sessions, and build a training history from day one. No barbell.
              No membership. Just force.
            </Text>
            <Group
              align="center"
              justify="flex-start"
              gap="md"
              // mt={20}
              w="100%"
            >
              <Button
                component={Link}
                to="/signup"
                variant="filled"
                size="md"
                radius="md"
              >
                Sign Up
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outline"
                size="md"
                radius="md"
              >
                Log In
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* ── Alpha notice ─────────────────────────────────────────────── */}
        <Alert
          icon={<IoInformationCircleOutline size={18} />}
          color="violet.9"
          bg="violet.0"
          radius="md"
          mb="xl"
          title="This is an early alpha release."
        >
          <Text fz={13} lh={1.7}>
            You may encounter bugs, and workout data may not carry over between
            future releases if breaking changes are required. Your feedback
            during this phase directly shapes what Torque becomes — thank you
            for being part of it.
          </Text>
        </Alert>

        {/* ── What's in alpha.1 ────────────────────────────────────────── */}
        <Stack gap="md" mb="xl">
          <Box>
            <Text
              fz={11}
              fw={500}
              lts="0.16em"
              tt="uppercase"
              c="dark.3"
              mb={6}
            >
              What's in alpha.1
            </Text>
            <Title order={2} fz={{ base: 28, sm: 38 }} lh={1} lts="0.02em">
              Everything you need to start training
            </Title>
          </Box>
          <Text fz={14} c="dark.3" lh={1.8} fw={300}>
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

        <Divider />

        {/* ── The foundation ───────────────────────────────────────────── */}
        <Stack gap="md" mb="xl">
          <Box>
            <Text
              fz={11}
              fw={500}
              lts="0.16em"
              tt="uppercase"
              c="dark.3"
              mb={6}
            >
              The foundation
            </Text>
            <Title order={2} fz={{ base: 28, sm: 38 }} lh={1} lts="0.02em">
              The most accessible gym ever built
            </Title>
          </Box>
          <Text fz={14} c="dark.3" lh={1.8} fw={300}>
            A floor. A pull-up bar. A park bench. That's your gym — free, open
            24 hours, and never crowded.{' '}
            <Text
              component="span"
              fw={500}
              c="var(--mantine-color-text)"
              inherit
            >
              Bodyweight training works because physics doesn't care where you
              are.
            </Text>{' '}
            Gravity applies the same force whether you're in a boutique studio
            or your living room at 6am. Torque helps you harness that force and
            build a real training record from the ground up.
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
            <StatCard
              value="∞"
              label="Locations you can train — floor optional"
            />
          </SimpleGrid>
        </Stack>

        <Divider />

        {/* ── Roadmap ──────────────────────────────────────────────────── */}
        <Stack gap="md" mb="xl">
          <Box>
            <Text
              fz={11}
              fw={500}
              lts="0.16em"
              tt="uppercase"
              c="dark.3"
              mb={6}
            >
              What's coming
            </Text>
            <Title order={2} fz={{ base: 28, sm: 38 }} lh={1} lts="0.02em">
              The roadmap
            </Title>
          </Box>
          <Text fz={14} c="dark.3" lh={1.8} fw={300}>
            Alpha.1 is the starting line. Here's where Torque is headed.
          </Text>
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
            {roadmap.map((r) => (
              <RoadmapCard key={r.version} {...r} />
            ))}
          </SimpleGrid>
        </Stack>

        <Divider />

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <Paper withBorder radius="lg" p="xl" bg="elevation.3">
          <Group justify="space-between" align="center" wrap="wrap" gap="lg">
            <Box maw={420}>
              <Title
                order={2}
                fz={{ base: 22, sm: 32 }}
                lh={1.1}
                lts="0.008em"
                mb="sm"
              >
                Your body is already the machine. Start using it.
              </Title>
              <Text fz={13} c="dark.3" lh={1.6} fw={300}>
                Free to download. Free to start. Get in early and help shape
                what Torque becomes.
              </Text>
            </Box>
            <Stack gap="xs" align="flex-end">
              <Text fz={10} fw={500} lts="0.1em" tt="uppercase" c="dark.3">
                Also available on
              </Text>
              <Paper withBorder radius="md" px="md" py={8}>
                <Group gap={8}>
                  <IoLogoGooglePlaystore size={16} />
                  <Text fz={13} fw={500}>
                    Google Play
                  </Text>
                </Group>
              </Paper>
            </Stack>
          </Group>
        </Paper>

        <Divider />

        <Group>
          <Text fz="sm">©2026 Anne Camero Digital Studio</Text>
        </Group>
      </Stack>
    </Container>
  );
}
