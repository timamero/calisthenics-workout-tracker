import { View, type DimensionValue } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

interface TextInputReadingProps {
  label: string;
  labelWidth: DimensionValue;
  value: string;
}

export default function TextInputReading({
  label,
  labelWidth,
  value,
}: TextInputReadingProps) {
  const theme = useTheme() as CustomTheme;
  return (
    <View>
      <View style={{ width: labelWidth }}>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontFamily: 'ElmsSans-Regular',
          }}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          color: theme.colors.onBackground,
          fontFamily: 'Manrope-Bold',
        }}
      >
        {value}
      </Text>
    </View>
  );
}
