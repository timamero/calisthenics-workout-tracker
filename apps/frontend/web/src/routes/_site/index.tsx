import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  ThemeIcon,
  rem,
  Stack,
  Box,
} from '@mantine/core';
import type { IconType } from 'react-icons';
import {
  IoStatsChartOutline,
  IoExtensionPuzzleOutline,
  IoPhonePortraitOutline,
  IoPeopleOutline,
  IoChevronForward,
} from 'react-icons/io5';

interface FeatureProps {
  icon: IconType;
  title: string;
  description: string;
}

export const Route = createFileRoute('/_site/')({
  component: HomeView,
});

/**
 * Feature sub-component to display individual value propositions
 */
function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <Stack align="center" gap="sm" ta="center">
      <ThemeIcon size={54} radius="xl" variant="light" color="blue">
        <Icon size={rem(32)} />
      </ThemeIcon>
      <Text fw={700} size="lg">
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </Stack>
  );
}

function HomeView() {
  return (
    <Box component="main">
      {/* Hero Section */}
      <Box
        bg="gray.0"
        style={{
          paddingTop: rem(120),
          paddingBottom: rem(100),
          backgroundImage:
            'radial-gradient(at 50% 50%, rgba(34, 139, 230, 0.05) 0%, transparent 50%)',
        }}
      >
        <Container size="lg">
          <Stack align="center" gap="xl" ta="center">
            <Title
              order={1}
              size={rem(56)}
              fw={900}
              style={{ lineHeight: 1.1 }}
            >
              Master Your Bodyweight with{' '}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                inherit
              >
                Torque
              </Text>
            </Title>
            <Text size="xl" c="dimmed" maw={640} mx="auto">
              The precision calisthenics workout tracker. Master advanced
              skills, track every progression, and visualize your strength
              journey like never before.
            </Text>
            <Group gap="md">
              <Button
                size="xl"
                radius="md"
                color="blue"
                rightSection={<IoChevronForward size={20} />}
              >
                Start Your Journey
              </Button>
              <Button size="xl" radius="md" variant="outline" color="blue">
                Explore Exercises
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="lg" py={rem(100)}>
        <Stack gap={50}>
          <Box ta="center">
            <Text fw={700} c="blue" tt="uppercase" lts={rem(1)} mb="xs">
              Features
            </Text>
            <Title order={2} size={rem(36)} fw={800}>
              Engineered for Bodyweight Athletes
            </Title>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={50}>
            <Feature
              icon={IoStatsChartOutline}
              title="Progress Analytics"
              description="Visualize your strength curves and volume history with detailed interactive charts."
            />
            <Feature
              icon={IoExtensionPuzzleOutline}
              title="Skill Tree"
              description="Unlock new levels of strength with our comprehensive progression roadmaps for elite skills."
            />
            <Feature
              icon={IoPhonePortraitOutline}
              title="Field Ready"
              description="A fast, responsive mobile experience designed for the intensity of your workout environment."
            />
            <Feature
              icon={IoPeopleOutline}
              title="Social Motivation"
              description="Connect with other athletes, share personal bests, and find inspiration for your next session."
            />
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Call to Action Section */}
      <Container size="lg" pb={rem(100)}>
        <Stack
          align="center"
          gap="xl"
          ta="center"
          bg="blue.7"
          p={{ base: 30, sm: 60 }}
          style={{ borderRadius: rem(24) }}
        >
          <Title order={2} size={rem(42)} c="white" fw={800}>
            Ready to master your bodyweight?
          </Title>
          <Text c="white" opacity={0.9} size="lg" maw={500}>
            Join thousands of athletes who are already using Torque to push
            their physical limits.
          </Text>
          <Button size="xl" variant="white" color="blue" radius="md">
            Create Your Free Account
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
