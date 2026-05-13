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
        paddingBlock: 8,
        // paddingInline: parentType === 'superset' ? 8 : 4,
        marginInline:
          parentType === 'superset' ? 16 : parentType === 'section' ? 20 : 4,
        // parentType === 'superset' ? 4 : parentType === 'section' ? 8 : 4,
        marginTop:
          parentType === 'superset' ? 0 : parentType === 'section' ? 24 : 44,
        marginBottom: isLast && !parentType ? 44 : 0,
        borderWidth: parentType === 'superset' ? 0 : 1,
        borderBottomWidth: 1,
        borderColor:
          parentType === 'superset' ? theme.colors.dark1 : theme.colors.outline,
        borderRadius: parentType === 'superset' ? 0 : 8,
        backgroundColor:
          parentType === 'superset'
            ? 'transparent'
            : theme.colors.backgroundOpaque,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingInline: 4,
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
        <View
          style={{
            // paddingBlock: 8,
            // paddingInline: 16,
            // marginBlock: 4,
            display: 'flex',
            alignItems: 'center',
            width: `${mode === 'log' ? '100%' : 'auto'}`,
            // width: 'min-content',
            flexShrink: 1,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.onBackground,
              // fontWeight: 800,
              textAlign: 'center',
              // flexShrink: 1,
              padding: 8,
              flexWrap: 'wrap',
            }}
          >
            {name}
          </Text>
        </View>
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
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          // paddingInline:
          //   parentType === 'superset' ? 0 : parentType === 'section' ? 14 : 16,
        }}
      >
        <SetList />
      </View>
      {(mode === 'build' || mode === 'edit') && (
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            margin: 8,
            // paddingBottom: 16,
            // paddingInline: 4,
          }}
        >
          <Button
            mode="outlined"
            onPress={() => handleAddSetPress()}
            // buttonColor={theme.colors.secondaryContainer}
            // textColor={theme.colors.onSecondaryContainer}
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
              transform: 'translateY(13px)',
              backgroundColor: theme.colors.elevation.level5,
              borderRadius: 12,
              padding: 1,
            }}
          >
            <Icon source="link" color={theme.colors.dark2} size={24} />
          </View>
        </View>
      )}
    </View>
  );
}
