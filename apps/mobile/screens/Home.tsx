import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome Home!</Text>
      <Text>This app is in a container.</Text>
      <Button onPressIn={() => navigation.navigate('About')}>
        Go to About
      </Button>
    </View>
  );
}