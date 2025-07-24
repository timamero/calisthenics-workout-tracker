import * as React from 'react';
import { ScrollView, View } from 'react-native';
import {
  useTheme,
  TextInput,
  Text,
  Button,
  Card,
  RadioButton,
  Checkbox,
} from 'react-native-paper';

export default function OnboardingScreen() {
  const theme = useTheme();

  const [weightUnit, setWeightUnit] = React.useState<string>('lbs');
  const [heightUnit, setHeightUnit] = React.useState<string>('inches');
  const [fitnessLevel, setFitnessLevel] = React.useState<string>('Beginner');
  const [duration, setDuration] = React.useState<string>('15-30 min');

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        // flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <Card>
        <Card.Title
          title="Profile"
          subtitle="Welcome! Let's set up your profile."
        />
        <Card.Content>
          <Text variant="titleLarge">Profile</Text>
          <Text variant="bodyMedium">
            Welcome! Let&apos;s set up your profile.
          </Text>
          <TextInput label="First Name" />
          <TextInput label="Last Name" />
          <TextInput label="Birthday" />
        </Card.Content>
      </Card>
      <Card>
        <Card.Title
          title="Fitness Information"
          subtitle="Tell us about your fitness journey."
        />
        <Card.Content>
          <Text variant="titleLarge">Fitness Information</Text>
          <Text variant="bodyMedium">Tell us about your fitness journey.</Text>
          <TextInput label="Enter your weight" />
          <RadioButton.Group
            onValueChange={(newValue) => setWeightUnit(newValue)}
            value={weightUnit}
          >
            <View>
              <Text>lbs</Text>
              <RadioButton value="lbs" />
            </View>
            <View>
              <Text>kg</Text>
              <RadioButton value="kg" />
            </View>
          </RadioButton.Group>
          <TextInput label="Enter your height" />
          <RadioButton.Group
            onValueChange={(newValue) => setHeightUnit(newValue)}
            value={heightUnit}
          >
            <View>
              <Text>inches</Text>
              <RadioButton value="inches" />
            </View>
            <View>
              <Text>cm</Text>
              <RadioButton value="cm" />
            </View>
          </RadioButton.Group>
          <Text>Fitness Level</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setFitnessLevel(newValue)}
            value={fitnessLevel}
          >
            <View>
              <Text>Beginner</Text>
              <RadioButton value="Beginner" />
            </View>
            <View>
              <Text>Intermediate</Text>
              <RadioButton value="Intermediate" />
            </View>
            <View>
              <Text>Advanced</Text>
              <RadioButton value="Advanced" />
            </View>
          </RadioButton.Group>

          <Text>Primary Fitness Goal</Text>
          <Checkbox.Item label="Build Strength" status="unchecked" />
          <Checkbox.Item label="Lose Weight" status="unchecked" />
          <Checkbox.Item label="Improve Endurance" status="unchecked" />
          <Checkbox.Item label="General Fitness" status="unchecked" />
          <Checkbox.Item label="Other" status="unchecked" />
        </Card.Content>
      </Card>
      <Card>
        <Card.Title
          title="Preferences"
          subtitle="Almost there! Set your preferences."
        />
        <Card.Content>
          <Text variant="titleLarge">Preferences</Text>
          <Text variant="bodyMedium">Almost there! Set your preferences.</Text>
          <Text>Preferred Workout Duration</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setDuration(newValue)}
            value={duration}
          >
            <View>
              <Text>15-30 min</Text>
              <RadioButton value="15-30 min" />
            </View>
            <View>
              <Text>30-45 min</Text>
              <RadioButton value="30-45 min" />
            </View>
            <View>
              <Text>45-60 min</Text>
              <RadioButton value="45-60 min" />
            </View>
            <View>
              <Text>60+ min</Text>
              <RadioButton value="60+ min" />
            </View>
          </RadioButton.Group>

          <Text>Available Equipment</Text>
          <Checkbox.Item label="None" status="unchecked" />
          <Checkbox.Item label="Pull-up Bar" status="unchecked" />
          <Checkbox.Item label="Parallel Bars" status="unchecked" />
          <Checkbox.Item label="Rings" status="unchecked" />
          <Checkbox.Item label="Weights" status="unchecked" />
          <Checkbox.Item label="Resistance Bands" status="unchecked" />
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => console.log('Finish Onboarding')}
      >
        Finish
      </Button>
    </ScrollView>
  );
}
