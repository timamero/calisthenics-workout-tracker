import { useContext } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { startWorkoutContent } from '@cwt/content';

import WorkoutDraftContext from '../contexts/WorkoutDraftContext';
import { globalStyles } from '../styles/global';
import { CustomTheme } from '../theme';
import { Text } from '../customText';
import LargeButton from '../components/common/LargeButton';

export default function StartWorkoutScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  const styles = globalStyles(theme);

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  // Disable displaying workout logs and templates until v.0.1.0-alpha.1.1
  // const workoutBuilds = useWorkoutLibraryStore(
  //   (state) => state.displayedWorkoutBuilds,
  // );
  // const workoutLogs = useWorkoutLibraryStore(
  //   (state) => state.displayedWorkoutLogs,
  // );
  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  // Disable start workout template until v.0.1.0-alpha.1.1
  // const onBuildNewWorkoutPress = () => {
  //   initializeWorkout('build');
  //   setIsAddWorkoutItemButtonsVisible(true);
  //   navigation.navigate('WorkoutStack', { screen: 'Workout' });
  // };

  const onLogNewWorkoutPress = () => {
    initializeWorkout('edit');
    setIsAddWorkoutItemButtonsVisible(true);
    navigation.navigate('WorkoutStack', { screen: 'Workout' });
  };

  // const workoutBuildCards = workoutBuilds.map((wo, i) => {
  //   const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
  //   return (
  //     <CardButton handlePress={() => console.log('clicked card')} key={i}>
  //       <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
  //         {workoutTitle}
  //       </Text>
  //     </CardButton>
  //   );
  // });

  // const workoutLogCards = workoutLogs.map((wo, i) => {
  //   const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
  //   return (
  //     <CardButton handlePress={() => console.log('clicked card')} key={i}>
  //       <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
  //         {workoutTitle}
  //       </Text>
  //     </CardButton>
  //   );
  // });

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
    <View style={styles.container}>
      {/* <LargeButton handlePress={onBuildNewWorkoutPress}>
        {startWorkoutContent().createNewBuildButton}
      </LargeButton> */}
      <View>
        <Text variant="headlineMedium">
          {startWorkoutContent().welcomeHeadline}
        </Text>
        <Text variant="bodyLarge">{startWorkoutContent().welcomeSubtext}</Text>
      </View>
      <View
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <View style={{ transform: 'translateY(-100%)' }}>
          <LargeButton handlePress={onLogNewWorkoutPress}>
            {/* {startWorkoutContent().createNewLogButton} */}
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.onSecondary }}
            >
              {startWorkoutContent().createNewLogButton}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSecondary }}
            >
              {startWorkoutContent().createNewLogSublabel}
            </Text>
          </LargeButton>
        </View>
      </View>
      {/* 
      <Text variant="headlineSmall" style={{ color: theme.colors.light }}>
        {startWorkoutContent().workoutBuildListHeading}
      </Text>
      <View
        style={{
          backgroundColor: theme.colors.dark800,
          marginBlock: 8,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              justifyContent: 'flex-start',
              width: '100%',
              paddingInline: 8,
              paddingBlock: 16,
            }}
          >
            {workoutBuildCards}
          </View>
        </ScrollView>
      </View> */}
      {/* <Text variant="headlineSmall" style={{ color: theme.colors.light }}>
        {startWorkoutContent().workoutLogListHeading}
      </Text>
      <View
        style={{
          backgroundColor: theme.colors.dark800,
          marginBlock: 8,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              justifyContent: 'flex-start',
              width: '100%',
              paddingInline: 8,
              paddingBlock: 16,
            }}
          >
            {workoutLogCards}
          </View>
        </ScrollView>
      </View> */}
    </View>
  );
}
