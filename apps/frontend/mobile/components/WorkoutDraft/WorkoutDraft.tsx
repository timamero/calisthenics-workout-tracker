import { useEffect, useContext } from 'react';
import { BackHandler } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import type { Mode } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutContextMobile } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import type { CustomTheme } from '../../theme';
import CustomButton from '../common/CustomButton';
import WorkoutDraftUI from './WorkoutDraftUI';

export default function WorkoutDraft() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const setIsCancelWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsCancelWorkoutDialogVisible!;
  const setIsSaveWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsSaveWorkoutDialogVisible!;

  const workoutDataScrollViewRef =
    useContext(WorkoutDraftContext)?.workoutDataScrollViewRef!;

  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomButton
          mode="text"
          onPress={() => setIsCancelWorkoutDialogVisible(true)}
          style={{
            marginRight: 24,
          }}
          textColor={theme.colors.onBackground}
        >
          Cancel
        </CustomButton>
      ),
      headerRight: () => (
        <CustomButton
          mode="contained-tonal"
          onPress={() => setIsSaveWorkoutDialogVisible(true)}
        >
          Finish
        </CustomButton>
      ),
      headerTitle: () => null,
    });
  }, [
    navigation,
    theme.colors.onBackground,
    setIsCancelWorkoutDialogVisible,
    setIsSaveWorkoutDialogVisible,
  ]);

  useEffect(() => {
    const onBackPress = () => {
      setIsCancelWorkoutDialogVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, [setIsCancelWorkoutDialogVisible]);

  return (
    <WorkoutDraftUI
      scrollViewRef={workoutDataScrollViewRef}
      workoutTitle={workoutTitle!}
      setWorkoutTitle={setWorkoutTitle}
      mode={mode}
    />
  );
}
