import { useEffect, useContext } from 'react';
import {
  View,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import type { Mode } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutContextMobile } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import WorkoutData from './WorkoutData';
import WorkoutOverlays from './WorkoutOverlays';
import type { CustomTheme } from '../../theme';
import TextInputWithEdit from '../common/TextInputWithEdit';
import CustomButton from '../common/CustomButton';
import BottomAppBar from './BottomAppBar';

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
        <Button
          mode="text"
          onPress={() => setIsCancelWorkoutDialogVisible(true)}
          style={{
            marginRight: 24,
          }}
          textColor={theme.colors.onBackground}
        >
          Cancel
        </Button>
      ),
      headerRight: () => (
        <CustomButton
          mode="contained"
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{
            marginBottom: 104,
            flexGrow: 1,
          }}
          ref={workoutDataScrollViewRef}
        >
          <TextInputWithEdit
            initialValue={workoutTitle!}
            onSave={setWorkoutTitle}
            variant="title"
            hideEdit={mode === 'log' ? true : false}
            maxLength={70}
          />
          <WorkoutData />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomAppBar />

      <WorkoutOverlays workoutDataScrollViewRef={workoutDataScrollViewRef} />
    </View>
  );
}
