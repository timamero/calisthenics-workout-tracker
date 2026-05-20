import { Stack, Container } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutData from './WorkoutData';
import WorkoutOverlays from './WorkoutOverlays';
import { TextInputWithEdit } from '../common/TextInputWithEdit';

export default function WorkoutDraft() {
  const mode = useWorkoutDraftStore((state) => state.mode);
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );
  return (
    <Container
      flex="1"
      w="100%"
      px={{ base: 'xxs', md: 'xl' }}
      py={{ base: 'md', md: 'xl' }}
    >
      <Stack gap="xl" align="center">
        <TextInputWithEdit
          initialValue={workoutTitle!}
          onSave={setWorkoutTitle}
          hideEdit={mode === 'log' ? true : false}
          variant={'title'}
          maxLength={70}
          titleOrder={1}
          titleSize="h1"
        />
        {mode === 'edit' || mode === 'build' ? (
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
            {/* <Stack gap="xl" align="center" w="100%"> */}
            <WorkoutData />
            {/* </Stack> */}
          </Stack>
        ) : (
          // <Stack gap="xl" align="center" w="100%">
          <WorkoutData />
          // </Stack>
        )}
      </Stack>
      <WorkoutOverlays />
      {/* </Stack> */}
    </Container>
  );
}
