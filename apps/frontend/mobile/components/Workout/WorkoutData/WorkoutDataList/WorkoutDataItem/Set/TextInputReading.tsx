import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

interface TextInputReadingProps {
  label: string;
  value: string;
}

export default function TextInputReading({
  label,
  value,
}: TextInputReadingProps) {
  const theme = useTheme() as CustomTheme;
  return (
    <View>
      <Text
        style={{
          color: theme.colors.dark4,
          fontFamily: 'ElmsSans-Bold',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: theme.colors.onBackground,
          fontFamily: 'Manrope-Regular',
        }}
      >
        {value}
      </Text>
    </View>
  );
}
