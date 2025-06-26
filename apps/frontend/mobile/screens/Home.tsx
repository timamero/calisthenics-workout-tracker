import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBearStore } from '@cwt/state/counter';
import { User } from '@cwt/schema/sampleSchema';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  const user: User = {
    name: 'Jane Doe',
    xp: 100,
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome Home {user.name}!</Text>
      <Text>xp = {user.xp}</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Text>{bears} bears around here</Text>
      <Button title="one up" onPress={() => increase(1)} />
    </View>
  );
}
