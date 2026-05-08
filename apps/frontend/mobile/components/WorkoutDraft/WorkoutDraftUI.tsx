import { type RefObject } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { Mode } from '@cwt/schema/workouts';

import WorkoutData from './WorkoutData';
import WorkoutOverlays from './WorkoutOverlays';
import type { CustomTheme } from '../../theme';
import TextInputWithEdit from '../common/TextInputWithEdit';
import BottomAppBar from './BottomAppBar';

interface WorkoutDraftUIProps {
  scrollViewRef: RefObject<ScrollView | null>;
  workoutTitle: string;
  setWorkoutTitle: (text: string) => void;
  mode: Mode;
}

export default function WorkoutDraftUI({
  scrollViewRef,
  workoutTitle,
  setWorkoutTitle,
  mode,
}: WorkoutDraftUIProps) {
  const theme = useTheme() as CustomTheme;

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
          ref={scrollViewRef}
        >
          <TextInputWithEdit
            initialValue={workoutTitle}
            onSave={setWorkoutTitle}
            variant="title"
            hideEdit={mode === 'log' ? true : false}
            maxLength={70}
          />
          <WorkoutData />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomAppBar />

      <WorkoutOverlays />
    </View>
  );
}
