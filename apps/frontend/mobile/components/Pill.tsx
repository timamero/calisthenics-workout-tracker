import { Text } from 'react-native-paper';
// import { View } from 'react-native';

export enum sizeTypes {
  sm = 'sm',
  lg = 'lg',
}

interface PillProps {
  children: string;
  size?: sizeTypes;
}

export default function Pill({ size = sizeTypes.sm, children }: PillProps) {
  const textSize = size === sizeTypes.sm ? 12 : 14;
  return (
    // <View style={{ width: 'auto' }}>
    <Text
      style={{
        paddingInline: 12,
        paddingBlock: 4,
        backgroundColor: '#ADD8E6',
        borderRadius: 12,
        fontSize: textSize,
      }}
    >
      {children}
    </Text>
    // </View>
  );
}
