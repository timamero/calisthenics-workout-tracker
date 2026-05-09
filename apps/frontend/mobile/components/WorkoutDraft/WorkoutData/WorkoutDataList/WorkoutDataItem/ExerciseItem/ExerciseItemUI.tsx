import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { Mode } from '@cwt/schema/workouts';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import SetList from '../SetList';
import WorkoutItemMenu from '../WorkoutItemMenu';

interface ExerciseItemUIProps {
  mode: Mode;
  name: string;
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleAddSetPress: () => void;
  handleDeleteExercisePress: () => void;
}

export default function ExerciseItemUI({
  mode,
  name,
  isFirst,
  isLast,
  handleUpPress,
  handleDownPress,
  handleAddSetPress,
  handleDeleteExercisePress,
}: ExerciseItemUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        // paddingInline: 16,
        // paddingBlock: 16,
        marginBlock: 32,
        marginInline: 4,
        borderWidth: 1,
        borderColor: theme.colors.lime4,
        backgroundColor: theme.colors.background,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 4,
        }}
      >
        {(mode === 'build' || mode === 'edit') && (
          <ReorderButtonGroup
            handleUpPress={() => handleUpPress()}
            handleDownPress={() => handleDownPress()}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onBackground,
            fontWeight: 800,
            textAlign: 'center',
            flexShrink: 1,
          }}
        >
          {name}
        </Text>
        {(mode === 'build' || mode === 'edit') && (
          <WorkoutItemMenu
            itemType="exercise"
            isFirst={isFirst}
            isLast={isLast}
            handleUpPress={handleUpPress}
            handleDownPress={handleDownPress}
            handleDeletePress={handleDeleteExercisePress}
          />
          // <Button
          //   mode="outlined"
          //   onPress={handleDeleteExercisePress}
          //   labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          //   textColor={theme.colors.onBackground}
          //   style={{ borderColor: theme.colors.error, flexShrink: 0 }}
          // >
          //   Delete Exercise
          // </Button>
        )}
      </View>
      <SetList />
      {(mode === 'build' || mode === 'edit') && (
        <View style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button
            mode="contained"
            onPress={() => handleAddSetPress()}
            buttonColor={theme.colors.secondaryContainer}
            textColor={theme.colors.onSecondaryContainer}
          >
            Add Set
          </Button>
        </View>
      )}
    </View>
  );
}
