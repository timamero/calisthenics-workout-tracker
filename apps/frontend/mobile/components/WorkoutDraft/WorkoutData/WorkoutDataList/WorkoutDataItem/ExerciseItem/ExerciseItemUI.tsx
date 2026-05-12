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
  parentItemsLength?: number;
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
  parentItemsLength,
  handleUpPress,
  handleDownPress,
  handleAddSetPress,
  handleDeleteExercisePress,
}: ExerciseItemUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        position: 'relative',
        paddingInline:
          parentType === 'superset' ? 8 : parentType === 'section' ? 0 : 4,
        marginInline:
          parentType === 'superset' ? 4 : parentType === 'section' ? 16 : 4,
        marginBlock:
          parentType === 'superset' ? 0 : parentType === 'section' ? 24 : 40,
        borderWidth: parentType === 'superset' ? 0 : 1,
        borderBottomWidth: 1,
        borderColor:
          parentType === 'superset' ? theme.colors.gray3 : theme.colors.outline,
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
            padding: 8,
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
        )}
      </View>
      <SetList />
      {(mode === 'build' || mode === 'edit') && (
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: 16,
            paddingInline: 4,
          }}
        >
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

      {parentType === 'superset' && parentItemsLength! > 1 && !isLast && (
        <View
          style={{
            position: 'absolute',
            height: 'auto',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            bottom: 0,
          }}
        >
          <View
            style={{
              transform: 'translateY(12px)',
            }}
          >
            <Icon source="link" color={theme.colors.gray5} size={24} />
          </View>
        </View>
      )}
    </View>
  );
}
