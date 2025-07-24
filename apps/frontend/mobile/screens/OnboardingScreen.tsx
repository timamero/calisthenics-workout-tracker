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
        gap: 32,
        paddingHorizontal: 16,
        paddingVertical: 32,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
      }}
    >
      <Card>
        <Card.Content>
          <Text variant="headlineLarge">Profile</Text>
          <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
            Welcome! Let&apos;s set up your profile.
          </Text>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextInput label="First Name" />
            <TextInput label="Last Name" />
            <TextInput label="Birthday" />
          </View>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Text variant="headlineLarge">Fitness Information</Text>
          <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
            Tell us about your fitness journey.
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
              marginVertical: 16,
            }}
          >
            <TextInput label="Enter your weight" style={{ flex: 1 }} />
            <RadioButton.Group
              onValueChange={(newValue) => setWeightUnit(newValue)}
              value={weightUnit}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <View>
                  <Text>lbs</Text>
                  <RadioButton value="lbs" />
                </View>
                <View>
                  <Text>kg</Text>
                  <RadioButton value="kg" />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <TextInput label="Enter your height" style={{ flex: 1 }} />
            <RadioButton.Group
              onValueChange={(newValue) => setHeightUnit(newValue)}
              value={heightUnit}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <View>
                  <Text>inches</Text>
                  <RadioButton value="inches" />
                </View>
                <View>
                  <Text>cm</Text>
                  <RadioButton value="cm" />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View style={{ marginVertical: 32 }}>
            <Text variant="headlineSmall">Fitness Level</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setFitnessLevel(newValue)}
              value={fitnessLevel}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 20,
                }}
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
              </View>
            </RadioButton.Group>
          </View>

          <Text variant="headlineSmall">Primary Fitness Goal</Text>

          <View style={{ display: 'flex', gap: 0 }}>
            <Checkbox.Item
              label="Build Strength"
              status="unchecked"
              style={{ marginVertical: 0, paddingVertical: 0 }}
            />
            <Checkbox.Item
              label="Lose Weight"
              status="unchecked"
              style={{ marginVertical: 0, paddingVertical: 0 }}
            />
            <Checkbox.Item
              label="Improve Endurance"
              status="unchecked"
              style={{ marginVertical: 0, paddingVertical: 0 }}
            />
            <Checkbox.Item
              label="General Fitness"
              status="unchecked"
              style={{ marginVertical: 0, paddingVertical: 0 }}
            />
            <Checkbox.Item
              label="Other"
              status="unchecked"
              style={{ marginVertical: 0, paddingVertical: 0 }}
            />
          </View>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Text variant="headlineLarge">Preferences</Text>
          <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
            Almost there! Set your preferences.
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text variant="headlineSmall">Preferred Workout Duration</Text>
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

            <View style={{ marginVertical: 32 }}>
              <Text variant="headlineSmall">Available Equipment</Text>
              <View style={{ display: 'flex', gap: 0 }}>
                <Checkbox.Item
                  label="None"
                  status="unchecked"
                  style={{ marginVertical: 0, paddingVertical: 0 }}
                />
                <Checkbox.Item
                  label="Pull-up Bar"
                  status="unchecked"
                  style={{ marginVertical: 0, paddingVertical: 0 }}
                />
                <Checkbox.Item
                  label="Parallel Bars"
                  status="unchecked"
                  style={{ marginVertical: 0, paddingVertical: 0 }}
                />
                <Checkbox.Item
                  label="Rings"
                  status="unchecked"
                  style={{ marginVertical: 0, paddingVertical: 0 }}
                />
                <Checkbox.Item
                  label="Weights"
                  status="unchecked"
                  style={{ marginVertical: 0, paddingVertical: 0 }}
                />
                <Checkbox.Item
                  label="Resistance Bands"
                  status="unchecked"
                  style={{ marginVertical: 0, paddingVertical: 0 }}
                />
              </View>
            </View>
          </View>
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
