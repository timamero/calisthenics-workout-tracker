import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, SegmentedButtons, Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Mode } from '@cwt/schema/workouts';
import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
} from '@cwt/state/stores';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import AddWorkoutItemButtons from './AddWorkoutItemButtons';
import type { CustomTheme } from '../../theme';

const BOTTOM_APPBAR_HEIGHT = 80;

export default function BottomAppBar() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme() as CustomTheme;

  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const setMode = useWorkoutDraftStore((state) => state.setMode);

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  const handleSetMode = (modeValue: Mode) => {
    if (modeValue === 'log') {
      setMode('log');
      setIsAddWorkoutItemButtonsVisible(false);
      startTimer();
    } else if (modeValue === 'edit') {
      setMode('edit');
      setIsAddWorkoutItemButtonsVisible(true);
      stopTimer();
    }
  };
  return (
    <Appbar
      elevated
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.gray0,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <SegmentedButtons
        density="small"
        value={mode}
        onValueChange={(value: Mode) => handleSetMode(value)}
        style={{
          position: 'absolute',
          left: 32,
          bottom: (BOTTOM_APPBAR_HEIGHT + bottom) / 2,
          transform: 'translateY(8px)',
        }}
        theme={{
          colors: {
            secondaryContainer: theme.colors.primaryContainer,
            onSecondaryContainer: theme.colors.onPrimaryContainer,
          },
        }}
        buttons={[
          {
            value: 'edit',
            label: 'Edit',
            style: { width: 50 },
            labelStyle: { fontFamily: 'Manrope-SemiBold' },
          },
          {
            value: 'log',
            label: 'Log',
            style: { width: 40 },
            labelStyle: { fontFamily: 'Manrope-SemiBold' },
          },
        ]}
      />
      <AddWorkoutItemButtons />
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
});
