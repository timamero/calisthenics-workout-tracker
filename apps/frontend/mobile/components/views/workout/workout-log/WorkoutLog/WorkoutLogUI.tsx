import { type RefObject } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Mode } from '@cwt/schema/workouts';

import type { CustomTheme } from '../../../../../theme';

import WorkoutData from '../../../../features/workout/WorkoutData';
import WorkoutOverlays from '../../../../overlays/workout/workout-log/WorkoutOverlays';
import TextInputWithEdit from '../../../../common/forms/TextInputWithEdit';
import BottomAppBar from '../../../../features/workout/BottomAppBar';

interface WorkoutLogUIProps {
  scrollViewRef: RefObject<ScrollView | null>;
  workoutTitle: string;
  setWorkoutTitle: (text: string) => void;
  mode: Mode;
}

const BOTTOM_APPBAR_HEIGHT = 80;

export default function WorkoutLogUI({
  scrollViewRef,
  workoutTitle,
  setWorkoutTitle,
  mode,
}: WorkoutLogUIProps) {
  const theme = useTheme() as CustomTheme;
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ImageBackground
        source={require('../../../../../assets/grid.png')}
        imageStyle={{ opacity: mode === 'build' || mode === 'edit' ? 1 : 0 }}
        style={{
          flex: 1,
        }}
        resizeMode="repeat"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              marginBottom: BOTTOM_APPBAR_HEIGHT + bottom,
              flexGrow: 1,
            }}
            ref={scrollViewRef}
          >
            <View style={{ marginTop: 8 }}>
              <TextInputWithEdit
                initialValue={workoutTitle}
                onSave={setWorkoutTitle}
                variant="title"
                hideEdit={mode === 'log' ? true : false}
                maxLength={70}
              />
            </View>
            <WorkoutData />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
      <BottomAppBar />

      <WorkoutOverlays />
    </View>
  );
}
