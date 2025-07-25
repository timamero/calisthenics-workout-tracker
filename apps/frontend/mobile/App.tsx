import * as React from 'react';
import { View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  ActivityIndicator,
} from 'react-native-paper';
import Navigation from './navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'thistle',
    background: 'snow',
  },
};

export default function App() {
  const loading = true;
  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 16,
            paddingHorizontal: 16,
            alignItems: 'stretch',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}
