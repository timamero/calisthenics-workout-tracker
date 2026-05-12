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
        borderBottomWidth: borderBottomWidth,
        borderBottomColor:
          parentType === 'superset' ? theme.colors.gray3 : theme.colors.gray7,
        paddingInline: 8,
        paddingBlock: 4,
        // marginBlock: 8,
        marginInline: 8,
        // borderRadius: 20,
        // backgroundColor: theme.colors.background,
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
        {!hasSupersetParentType && (mode === 'build' || mode === 'edit') && (
          <Text
            style={{ color: theme.colors.onBackground }}
          >{`Set ${setIndex + 1}`}</Text>
        )}
        {showDeleteButton && (mode === 'build' || mode === 'edit') && (
          // <Button
          //   mode="outlined"
          //   onPress={() => onDeleteSetPress()}
          //   labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          //   textColor={theme.colors.onBackground}
          //   style={{ borderColor: theme.colors.error }}
          // >
          //   Delete Set
          // </Button>
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
          gap: 8,
          paddingBottom: 8,
        }}
      >
        <FieldsList />
        <LeverageAssistFieldsList />
      </View>
      {mode === 'log' && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingTop: 4,
          }}
        >
          <Checkbox.Item
            label="Completed"
            status={isCompleted ? 'checked' : 'unchecked'}
            onPress={() => handleToggleCompleted(!isCompleted)}
            labelStyle={{
              color: theme.colors.onBackground,
              fontSize: 16,
            }}
            style={{
              width: 160,
            }}
          />
        </View>
      )}
    </View>
  );
}
