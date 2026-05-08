import { useEffect, useContext } from 'react';
import {
  View,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme, Button, SegmentedButtons, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Mode } from '@cwt/schema/workouts';
import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
} from '@cwt/state/stores';
import { useWorkoutContextMobile } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import WorkoutData from './WorkoutData';
import WorkoutOverlays from './WorkoutOverlays';
import AddWorkoutItemButtons from './AddWorkoutItemButtons';
import type { CustomTheme } from '../../theme';
import TextInputWithEdit from '../common/TextInputWithEdit';
import CustomButton from '../common/CustomButton';

const BOTTOM_APPBAR_HEIGHT = 80;

export default function WorkoutDraft() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const setIsCancelWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsCancelWorkoutDialogVisible!;
  const setIsSaveWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsSaveWorkoutDialogVisible!;

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;
  const workoutDataScrollViewRef =
    useContext(WorkoutDraftContext)?.workoutDataScrollViewRef!;

  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );

  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const setMode = useWorkoutDraftStore((state) => state.setMode);

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

      <Appbar
        elevated
        style={[
          styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
            backgroundColor: theme.colors.elevation.level1,
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
      <WorkoutOverlays workoutDataScrollViewRef={workoutDataScrollViewRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
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
