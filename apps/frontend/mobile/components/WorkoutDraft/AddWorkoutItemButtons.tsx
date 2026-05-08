import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, FAB, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAddSupersetMobile } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../../theme';
import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

export default function AddWorkoutItemButtons() {
  const { bottom } = useSafeAreaInsets();
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
        // style={[styles.fabGroup, { top: 0 }]}
        // style={[
        //   styles.fabGroup,
        //   { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
        // ]}
        // fabStyle={[
        //   styles.fab,
        //   { top: -(BOTTOM_APPBAR_HEIGHT + bottom) + MEDIUM_FAB_HEIGHT / 2 },
        // ]}
        // fabStyle={[
        //   styles.fab,
        //   { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
        // ]}
        // color={theme.colors.onBackground}
        actions={[
          {
            icon: 'application',
            label: 'Add Section',
            // labelTextColor: theme.colors.light,
            // style: styles.fab,
            // color: theme.colors.dark700,
            onPress: () => addSection(),
          },
          {
            icon: 'alpha-s-circle',
            label: 'Add Superset',
            // labelTextColor: theme.colors.light,
            // style: styles.fab,
            // color: theme.colors.dark700,
            onPress: () => handleAddSupersetPress(),
          },
          {
            icon: 'arm-flex',
            label: 'Add Exercise',
            // labelTextColor: theme.colors.light,
            // style: styles.fab,
            // color: theme.colors.dark700,
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
      // position: 'absolute',
      // right: 0,
      // top: 0,
      paddingRight: 16,
    },
    // fab: {
    //   backgroundColor: theme.colors.dark100,
    // },
    fab: {
      position: 'absolute',
      right: 0,
    },
  });
