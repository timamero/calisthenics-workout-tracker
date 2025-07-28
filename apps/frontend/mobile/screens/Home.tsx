import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBearStore } from '@cwt/state/counter';
import { User } from '@cwt/schema/sampleSchema';
import { getData } from '@cwt/api/projectData';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  const [data, setData] = useState(null);
  const user: User = {
    name: 'Jane Doe',
    xp: 90,
  };

  console.log('Data', data);
  useEffect(() => {
    console.log('Fetching data from public route...');
    const baseUrl = 'http://REDACTED_IP:8000';
    const fetchData = async () => {
      try {
        const result = await getData(baseUrl);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
