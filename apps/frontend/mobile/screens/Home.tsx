import React from 'react';
import { useTheme, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { useFetchLeveragesAssists } from '../hooks/useFetchLeveragesAssists';
import { CustomTheme } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  const user = {
    name: 'Jane Doe',
    xp: 90,
  };

  // useFetchLeveragesAssists();

  // temporarily disabled until v0.1.0-alpha.2
  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button
  //         mode="text"
  //         icon="account"
  //         onPress={() => navigation.navigate('Profile')}
  //         style={{
  //           marginRight: 24,
  //         }}
  //         textColor={theme.colors.grey}
  //       >
  //         Profile
  //       </Button>
  //     ),
  //   });
  // }, [navigation, theme.colors.grey]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ color: theme.colors.light }}>
        Welcome Home {user.name}!
      </Text>
      <Text>xp = {user.xp}</Text>
      <Button onPress={() => navigation.navigate('WorkoutDashboard')}>
        Start a workout
      </Button>
    </View>
  );
}
