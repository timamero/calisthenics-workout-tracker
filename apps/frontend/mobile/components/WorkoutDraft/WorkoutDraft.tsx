import { useEffect, useContext } from 'react';
import {
  View,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  useTheme,
  Button,
  SegmentedButtons,
  Appbar,
  FAB,
} from 'react-native-paper';
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
const MEDIUM_FAB_HEIGHT = 56;

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
        // style={{ flexShrink: 1 }}
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{
            marginBottom: 104,
            flexGrow: 1,
            backgroundColor: theme.colors.lime2,
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
          {/* <WorkoutData scrollViewRef={workoutDataScrollViewRef} /> */}
          <WorkoutData />
          {/* <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {mode !== 'log' && <AddWorkoutItemButtons />} */}

          {/* <View
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
            > */}
          {/* {mode !== 'build' && (
                <SegmentedButtons
                  density="small"
                  value={mode}
                  onValueChange={(value: Mode) => handleSetMode(value)}
                  theme={{
                    colors: { secondaryContainer: theme.colors.primary },
                  }}
                  buttons={[
                    {
                      value: 'edit',
                      label: 'Edit',
                      uncheckedColor: theme.colors.onBackground,
                    },
                    {
                      value: 'log',
                      label: 'Log',
                      uncheckedColor: theme.colors.onBackground,
                    },
                  ]}
                />
              )} */}

          {/* <Button
                icon="check"
                theme={{
                  colors: {
                    primaryContainer: theme.colors.background,
                    onPrimaryContainer: theme.colors.onBackground,
                  },
                }}
                style={{
                  borderWidth: 2,
                  borderColor: theme.colors.primary,
                }}
                onPress={() => setIsSaveWorkoutDialogVisible(true)}
              >
                Complete Workout
              </Button> */}
          {/* </View> */}
          {/* </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* 
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 24,
          height: 150,
          backgroundColor: theme.colors.red4,
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
                  justifyContent: 'center',
                  marginInline: 16,
                  // marginBottom: 16,
                  backgroundColor: theme.colors.violet3,
                }
          }
        >
          {mode !== 'build' && (
            <SegmentedButtons
              density="small"
              value={mode}
              onValueChange={(value: Mode) => handleSetMode(value)}
              style={{
                // width: 'auto',
                backgroundColor: theme.colors.dark8,
                transform: 'translateX(-50%)',
              }}
              theme={{
                colors: { secondaryContainer: theme.colors.primary },
              }}
              buttons={[
                {
                  value: 'edit',
                  label: 'Edit',
                  // uncheckedColor: theme.colors.onBackground,
                  style: { width: 50 },
                  labelStyle: { fontFamily: 'Manrope-SemiBold' },
                },
                {
                  value: 'log',
                  label: 'Log',
                  style: { width: 40 },
                  labelStyle: { fontFamily: 'Manrope-SemiBold' },
                  // uncheckedColor: theme.colors.onBackground,
                },
              ]}
            />
          )}
        </View>
      </View> */}
      <Appbar
        style={[
          styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
            backgroundColor: theme.colors.elevation.level2,
          },
        ]}
        safeAreaInsets={{ bottom }}
      >
        {/* <Appbar.Action icon="archive" onPress={() => {}} />
        <Appbar.Action icon="email" onPress={() => {}} />
        <Appbar.Action icon="label" onPress={() => {}} />
        <Appbar.Action icon="delete" onPress={() => {}} /> */}
        <SegmentedButtons
          density="small"
          value={mode}
          onValueChange={(value: Mode) => handleSetMode(value)}
          style={{
            // width: 'auto',
            position: 'absolute',
            left: 32,
            bottom: (BOTTOM_APPBAR_HEIGHT + bottom) / 2,
            // bottom: (BOTTOM_APPBAR_HEIGHT + bottom) / 2,
            transform: 'translateY(8px)',
          }}
          theme={{
            colors: { secondaryContainer: theme.colors.primary },
          }}
          buttons={[
            {
              value: 'edit',
              label: 'Edit',
              // uncheckedColor: theme.colors.onBackground,
              style: { width: 50 },
              labelStyle: { fontFamily: 'Manrope-SemiBold' },
            },
            {
              value: 'log',
              label: 'Log',
              style: { width: 40 },
              labelStyle: { fontFamily: 'Manrope-SemiBold' },
              // uncheckedColor: theme.colors.onBackground,
            },
          ]}
        />
        <AddWorkoutItemButtons />
        {/* <FAB
          mode="flat"
          size="medium"
          icon="plus"
          onPress={() => {}}
          style={[
            styles.fab,
            { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
          ]}
        /> */}
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
