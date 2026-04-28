import { useEffect, useContext } from 'react';
import { View, BackHandler } from 'react-native';
import { useTheme, Button, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import type { Mode } from '@cwt/schema/workouts';
import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
} from '@cwt/state/stores';
import { useWorkoutContextMobile } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import WorkoutData from './WorkoutData';
import WorkoutTitle from './WorkoutTitle';
import WorkoutOverlays from './WorkoutOverlays';
import AddWorkoutItemButtons from './AddWorkoutItemButtons';
import type { CustomTheme } from '../../theme';

export default function WorkoutDraft() {
  // const scrollViewRef = useRef<ScrollView | null>(null);

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
          textColor={theme.colors.grey}
        >
          Cancel
        </Button>
      ),
      headerTitle: () => null,
    });
  }, [navigation, theme.colors.grey, setIsCancelWorkoutDialogVisible]);

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
      <WorkoutTitle />
      <WorkoutData scrollViewRef={workoutDataScrollViewRef} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {mode !== 'log' && <AddWorkoutItemButtons />}

        <View
          style={
            mode === 'build'
              ? {
                  position: 'relative',
                  marginInline: 16,
                  marginBottom: 16,
                }
              : {
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginInline: 16,
                  marginBottom: 16,
                }
          }
        >
          {mode !== 'build' && (
            <SegmentedButtons
              density="small"
              value={mode}
              onValueChange={(value: Mode) => handleSetMode(value)}
              theme={{ colors: { secondaryContainer: theme.colors.primary } }}
              buttons={[
                {
                  value: 'edit',
                  label: 'Edit',
                  uncheckedColor: theme.colors.light,
                },
                {
                  value: 'log',
                  label: 'Log',
                  uncheckedColor: theme.colors.light,
                },
              ]}
            />
          )}

          <Button
            icon="check"
            theme={{
              colors: {
                primaryContainer: theme.colors.background,
                onPrimaryContainer: theme.colors.light,
              },
            }}
            style={{
              borderWidth: 2,
              borderColor: theme.colors.primary,
            }}
            onPress={() => setIsSaveWorkoutDialogVisible(true)}
          >
            Complete Workout
          </Button>
        </View>
      </View>
      <WorkoutOverlays workoutDataScrollViewRef={workoutDataScrollViewRef} />
    </View>
  );
}
