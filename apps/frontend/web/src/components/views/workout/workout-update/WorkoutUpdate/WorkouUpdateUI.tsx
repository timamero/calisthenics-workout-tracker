import { Stack, Container } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

import { TextInputWithEdit } from '../../../../common/forms/TextInputWithEdit';

interface WorkoutUpdateUIProps {
  mode: Mode;
  workoutTitle: string;
  setWorkoutTitle: (title: string) => void;
  children: React.ReactNode;
}

export default function WorkoutUpdateUI({
  mode,
  workoutTitle,
  setWorkoutTitle,
  children,
}: WorkoutUpdateUIProps) {
  return (
    <Container
      flex="1"
      w="100%"
      px={{ base: 'xxs', md: 'xl' }}
      py={{ base: 'md', md: 'xl' }}
    >
      <Stack gap="xl" align="center">
        <TextInputWithEdit
          initialValue={workoutTitle}
          onSave={setWorkoutTitle}
          hideEdit={mode === 'log' || mode === 'read' ? true : false}
          variant={'title'}
          maxLength={70}
          titleOrder={1}
          titleSize="h1"
        />
        <Stack pos="relative" h="100%" w="100%">
          <Stack
            pos="fixed"
            inset={0}
            h="100vh"
            style={{
              display: 'flex',
              zIndex: '-1',
              backgroundImage: `
                    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                  `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 0',
              maskImage: `
                    repeating-linear-gradient(
                      to right,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    ),
                    repeating-linear-gradient(
                      to bottom,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    )
                  `,
              WebkitMaskImage: `
                    repeating-linear-gradient(
                      to right,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    ),
                    repeating-linear-gradient(
                      to bottom,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    )
                  `,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
          {children}
        </Stack>
      </Stack>
    </Container>
  );
}
