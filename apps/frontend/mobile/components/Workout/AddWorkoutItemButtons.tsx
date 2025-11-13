import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, FAB, Portal } from 'react-native-paper';

import { CustomTheme } from '../../theme';
import { WorkoutContext } from '@cwt/context';

export default function AddWorkoutItemButtons() {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

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
        // variant="surface"
        visible
        icon={open ? 'close' : 'plus'}
        style={styles.fabGroup}
        fabStyle={styles.fab}
        color={theme.colors.dark700}
        actions={[
          {
            icon: 'application',
            label: 'Add Section',
            labelTextColor: theme.colors.light,
            style: styles.fab,
            color: theme.colors.dark700,
            onPress: () => setIsAddSectionOverlayVisible?.(true),
          },
          {
            icon: 'alpha-s-circle',
            label: 'Add Superset',
            labelTextColor: theme.colors.light,
            style: styles.fab,
            color: theme.colors.dark700,
            onPress: () => setIsAddSupersetOverlayVisible?.(true),
          },
          {
            icon: 'arm-flex',
            label: 'Add Exercise',
            labelTextColor: theme.colors.light,
            style: styles.fab,
            color: theme.colors.dark700,
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

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    fabGroup: {
      position: 'absolute',
      marginRight: 8,
      paddingBottom: 48,
      right: 0,
      bottom: 0,
    },
    fab: {
      backgroundColor: theme.colors.dark100,
    },
  });
