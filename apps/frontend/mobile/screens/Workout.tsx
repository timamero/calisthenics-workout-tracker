import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { WorkoutContextProvider } from '@cwt/context';

import WorkoutDraft from '../components/WorkoutDraft';
import type { CustomTheme } from '../theme';
import { WorkoutTitleContainer as WorkoutTitle } from '../components/WorkoutDraft/WorkoutTitle';

export default function WorkoutScreen() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const [isCancelWorkoutDialogVisible, setIsCancelWorkoutDialogVisible] =
    useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          mode="text"
          onPress={() => setIsCancelWorkoutDialogVisible(true)}
          style={{
            marginRight: 24,
          }}
          textColor={theme.colors.grey}
        >
          Cancel
        </Button>
      ),
      headerTitle: () => <WorkoutTitle />,
    });
  }, [navigation, theme.colors.grey]);

  useEffect(() => {
    const onBackPress = () => {
      setIsCancelWorkoutDialogVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <WorkoutContextProvider appType="mobile">
      <WorkoutDraft
        isCancelWorkoutDialogVisible={isCancelWorkoutDialogVisible}
        setIsCancelWorkoutDialogVisible={setIsCancelWorkoutDialogVisible}
      />
    </WorkoutContextProvider>
  );
}
