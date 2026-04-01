import { RefObject } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { Mode } from '@cwt/schema/workouts';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutDataList from './WorkoutDataList';

interface WorkoutDataProps {
  scrollViewRef: RefObject<ScrollView | null>;
}

export default function WorkoutData({ scrollViewRef }: WorkoutDataProps) {
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).length;

  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{ marginBottom: 104, flexGrow: 1 }}
        ref={scrollViewRef}
      >
        {workoutExercisesLength === 0 && (
          <EmptyWorkoutPlaceholder mode={mode} />
        )}
        <WorkoutDataList />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
