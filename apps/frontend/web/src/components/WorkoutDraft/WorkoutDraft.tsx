import { Stack, Button, SegmentedControl, Center, Affix } from '@mantine/core';
import { IoCreateOutline, IoPlayOutline } from 'react-icons/io5';

import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
} from '@cwt/state/stores';
import { useWorkoutContextWeb } from '@cwt/hooks';
import type { Mode } from '@cwt/schema/workouts';

import WorkoutData from './WorkoutData';
import { WorkoutTitleContainer as WorkoutTitle } from './WorkoutTitle';
import WorkoutOverlays from './WorkoutOverlays';
import AddWorkoutItemMenu from './AddWorkoutItemMenu';

export default function WorkoutDraft() {
  const saveOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayHandler;
  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const setMode = useWorkoutDraftStore((state) => state.setMode);

  const handleSetMode = () => {
    if (mode === 'edit') {
      setMode('log');
      startTimer();
    } else if (mode === 'log') {
      setMode('edit');
      stopTimer();
    }
  };
  return (
    <Stack gap="xl" align="center">
      {mode !== 'build' && (
        <Affix position={{ top: 72, right: 20 }}>
          <SegmentedControl
            value={mode as 'edit' | 'log'}
            onChange={() => handleSetMode()}
            color="lime.2"
            data={[
              {
                value: 'edit',
                label: (
                  <Center style={{ gap: 10 }}>
                    <IoCreateOutline size={16} />
                    <span>Edit</span>
                  </Center>
                ),
              },
              {
                value: 'log',
                label: (
                  <Center style={{ gap: 10 }}>
                    <IoPlayOutline size={16} />
                    <span>Log</span>
                  </Center>
                ),
              },
            ]}
          />
        </Affix>
      )}
      <WorkoutTitle />
      <Stack gap="xl" align="center">
        <WorkoutData />
        <Stack justify="center">
          {mode !== 'log' && (
            <Affix
              position={{ bottom: 72, right: '50%' }}
              style={{ transform: 'translateX(50%)' }}
            >
              <AddWorkoutItemMenu />
            </Affix>
          )}

          <Button
            variant="filled"
            color="orange"
            onClick={() => saveOverlayHandler!.open()}
          >
            Save Workout
          </Button>
          <Button
            variant="subtle"
            color="gray"
            onClick={() => cancelOverlayHandler!.open()}
          >
            {`Cancel Workout ${mode === 'build' ? 'Building' : 'Logging'}`}
          </Button>
        </Stack>
      </Stack>
      <WorkoutOverlays />
    </Stack>
  );
}
