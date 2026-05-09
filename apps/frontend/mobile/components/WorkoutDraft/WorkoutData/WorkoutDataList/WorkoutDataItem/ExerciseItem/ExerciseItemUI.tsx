import { View } from 'react-native';
import { useTheme, Button, Icon } from 'react-native-paper';

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
  parentType?: 'superset' | 'section' | null;
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
  parentType,
  handleUpPress,
  handleDownPress,
  handleAddSetPress,
  handleDeleteExercisePress,
}: ExerciseItemUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        paddingInline:
          parentType === 'superset' ? 8 : parentType === 'section' ? 0 : 4,
        // paddingBlock: 16,
        marginInline:
          parentType === 'superset' ? 4 : parentType === 'section' ? 16 : 4,
        // marginInline: 4,
        marginBlock:
          parentType === 'superset' ? 0 : parentType === 'section' ? 24 : 40,
        borderWidth: parentType === 'superset' ? 0 : 1,
        borderBottomWidth: 1,
        borderColor:
          parentType === 'superset' ? theme.colors.gray3 : theme.colors.outline,
        // borderColor: theme.colors.lime4,
        // backgroundColor: theme.colors.secondaryContainer,
        borderRadius: parentType === 'superset' ? 0 : 8,
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
            padding: 16,
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
        <View style={{ display: 'flex', alignItems: 'flex-end', padding: 16 }}>
          <Button
            mode="contained"
            onPress={() => handleAddSetPress()}
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
            icon="plus"
          >
            Set
          </Button>
        </View>
      )}
      <View
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon source="link" color={theme.colors.gray7} size={24} />
      </View>
    </View>
  );
}
