import { render } from '@testing-library/react-native';

import { Text, View } from 'react-native';

function HomeScreen() {
  return (
    <View>
      <Text>Welcome Home!</Text>
    </View>
  );
}

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Welcome Home!');
  });
});
