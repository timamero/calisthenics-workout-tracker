import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, FAB, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useAddSupersetMobile } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../theme';
import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

export default function AddWorkoutItemButtons() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  const isAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.isAddWorkoutItemButtonsVisible!;
  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  // const mode = useWorkoutDraftStore((state) => state.mode);
  const addSection = useWorkoutDraftStore((state) => state.addSection);

  const handleAddSupersetPress = useAddSupersetMobile().handleAddSupersetPress;
  // const handleOpenAddExerciseOverlayPress =
  //   useAddExerciseOverlayMobile().handleOpenAddExerciseOverlayPress;

  const handleAddExercisePress = () => {
    setIsAddWorkoutItemButtonsVisible(false);
    navigation.navigate('WorkoutStack', { screen: 'AddExercise' });
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={isAddWorkoutItemButtonsVisible}
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
            onPress: () => addSection(),
          },
          {
            icon: 'alpha-s-circle',
            label: 'Add Superset',
            labelTextColor: theme.colors.light,
            style: styles.fab,
            color: theme.colors.dark700,
            onPress: () => handleAddSupersetPress(),
          },
          {
            icon: 'arm-flex',
            label: 'Add Exercise',
            labelTextColor: theme.colors.light,
            style: styles.fab,
            color: theme.colors.dark700,
            onPress: () => handleAddExercisePress(),
            // onPress: () => navigation.navigate('AddExercise'),
            // onPress: () => handleOpenAddExerciseOverlayPress(),
          },
        ]}
        onStateChange={onStateChange}
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
