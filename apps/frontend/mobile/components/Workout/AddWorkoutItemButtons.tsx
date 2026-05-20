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

  const addSection = useWorkoutDraftStore((state) => state.addSection);

  const handleAddSupersetPress = useAddSupersetMobile().handleAddSupersetPress;

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
        // variant="tertiary"
        // theme={{
        //   colors: {
        //     tertiaryContainer: theme.colors.tertiary,
        //     onTertiaryContainer: theme.colors.onTertiary,
        //   },
        // }}
        actions={[
          {
            icon: 'application',
            label: 'Add Section',
            onPress: () => addSection(),
            labelStyle: styles.labelStyle,
            // style: styles.labelStyle,
          },
          {
            icon: 'alpha-s-circle',
            label: 'Add Superset',
            labelStyle: styles.labelStyle,
            onPress: () => handleAddSupersetPress(),
          },
          {
            icon: 'arm-flex',
            label: 'Add Exercise',
            labelStyle: styles.labelStyle,
            onPress: () => handleAddExercisePress(),
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
      paddingRight: 16,
      // fontFamily: 'Manrope-Regular',
    },
    fab: {
      position: 'absolute',
      right: 0,
      // fontFamily: 'sans-serif',
    },
    labelStyle: {
      fontFamily: 'Manrope-Regular',
    },
  });
