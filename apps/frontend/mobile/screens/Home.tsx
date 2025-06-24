import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBearStore } from '@cwt/state/counter';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome Home!</Text>
      <Text>Testing preview build</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Text>{bears} bears around here</Text>
      <Button title="one up" onPress={() => increase(1)} />
    </View>
  );
}
