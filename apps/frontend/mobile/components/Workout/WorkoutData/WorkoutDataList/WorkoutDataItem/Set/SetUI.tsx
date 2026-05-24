import { View } from 'react-native';
import { useTheme, Checkbox, IconButton } from 'react-native-paper';

import { Mode } from '@cwt/schema/workouts';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';
import FieldsList from './FieldsList';
import LeverageAssistFieldsList from './LeverageAssistFieldsList';

interface SetUIProps {
  mode: Mode;
  setsLength?: number;
  setIndex: number;
  isCompleted: boolean;
  parentType?: 'superset' | 'section' | null;
  showDeleteButton?: boolean;
  hasSupersetParentType?: boolean | null;
  handleToggleCompleted: (value: boolean) => void;
  onDeleteSetPress: () => void;
}

export default function SetUI({
  mode,
  setsLength,
  setIndex,
  isCompleted,
  parentType,
  showDeleteButton,
  hasSupersetParentType,
  handleToggleCompleted,
  onDeleteSetPress,
}: SetUIProps) {
  const theme = useTheme() as CustomTheme;
  const borderBottomWidth =
    setsLength && setsLength > 0 && setIndex !== setsLength - 1 ? 1 : 0;
  return (
    <View
      key={`set-${setIndex}`}
      style={{
        width: 320,
        borderBottomWidth: borderBottomWidth,
        borderBottomColor: theme.colors.gray3,
        paddingBottom: setIndex !== setsLength! - 1 ? 8 : 0,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* {!hasSupersetParentType && (mode === 'build' || mode === 'edit') && ( */}
        {!hasSupersetParentType && (
          <View style={{ paddingBlock: 8 }}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.dark4 }}
            >{`Set ${setIndex + 1}`}</Text>
          </View>
        )}

        {showDeleteButton && (mode === 'build' || mode === 'edit') && (
          <IconButton
            icon="trash-can"
            iconColor={theme.colors.error}
            size={20}
            onPress={() => onDeleteSetPress()}
            style={{
              margin: 0,
            }}
          />
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // gap: 8,
          // paddingBottom: 8,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          <FieldsList />
          <LeverageAssistFieldsList />
        </View>
      </View>
      {mode === 'log' && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Checkbox.Item
            label="Completed"
            status={isCompleted ? 'checked' : 'unchecked'}
            onPress={() => handleToggleCompleted(!isCompleted)}
            theme={{ colors: { primary: theme.colors.lime4 } }}
            rippleColor={theme.colors.lime2}
            labelStyle={{
              color: theme.colors.onBackground,
              fontSize: 16,
            }}
            style={{
              width: 160,
              height: 36,
            }}
          />
        </View>
      )}
    </View>
  );
}
