import { useContext, useState } from 'react';
import { useTheme, Portal, FAB } from 'react-native-paper';

import { CustomTheme } from '../../theme';
import { WorkoutContext } from '@cwt/context';

export default function AddWorkoutItemButtons() {
  const theme = useTheme() as CustomTheme;

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const setIsAddSectionOverlayVisible =
    useContext(WorkoutContext)?.setIsAddSectionOverlayVisible;
  const setIsAddSupersetOverlayVisible =
    useContext(WorkoutContext)?.setIsAddSupersetOverlayVisible;
  const setIsAddExerciseOverlayVisible =
    useContext(WorkoutContext)?.setIsAddExerciseOverlayVisible;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'application',
            label: 'Add Section',
            labelTextColor: theme.colors.light,
            onPress: () => setIsAddSectionOverlayVisible?.(true),
          },
          {
            icon: 'alpha-s-circle',
            label: 'Add Superset',
            labelTextColor: theme.colors.light,
            onPress: () => setIsAddSupersetOverlayVisible?.(true),
          },
          {
            icon: 'arm-flex',
            label: 'Add Exercise',
            labelTextColor: theme.colors.light,
            onPress: () => setIsAddExerciseOverlayVisible?.(true),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            console.log('speed dial open');
          }
        }}
      />
    </Portal>
  );
}
