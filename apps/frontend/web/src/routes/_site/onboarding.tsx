import { createFileRoute } from '@tanstack/react-router';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  SegmentedControl,
  Radio,
  Checkbox,
  CheckboxGroup,
  Select,
  Title,
  Stack,
} from '@mantine/core';
import type { ComboboxItem } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';

export const Route = createFileRoute('/_site/onboarding')({
  component: OnboardingView,
});

function OnboardingView() {
  const [active, setActive] = useState(0);

  // Step 1: Profile
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState<string | null>(null);

  // Step 2: Fitness Information
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [fitnessLevel, setFitnessLevel] = useState('Beginner');
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([]);

  // Step 3: Preferences
  const [workoutDuration, setWorkoutDuration] = useState<ComboboxItem | null>(
    null,
  );
  const [equipment, setEquipment] = useState<string[]>([]);

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stepper active={active} onStepClick={setActive}>
      {/* Step 1: Profile */}
      <Stepper.Step label="Profile">
        <Stack>
          <Title order={3}>Welcome! Let's set up your profile.</Title>
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="Enter your first name"
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            placeholder="Enter your last name"
          />
          {/* TODO: Add date of birth label */}
          <DatePicker value={dob} onChange={setDob} />
          <Group justify="flex-end" mt="md">
            <Button onClick={nextStep}>Next</Button>
          </Group>
        </Stack>
      </Stepper.Step>

      {/* Step 2: Fitness Information */}
      <Stepper.Step label="Fitness Information">
        <Stack>
          <Title order={3}>Tell us about your fitness journey.</Title>
          <Group grow>
            <TextInput
              label="Weight"
              value={weight}
              onChange={(e) => setWeight(e.currentTarget.value)}
              placeholder="Enter your weight"
              type="number"
            />
            <SegmentedControl
              data={[
                { label: 'kg', value: 'kg' },
                { label: 'lbs', value: 'lbs' },
              ]}
              value={weightUnit}
              onChange={setWeightUnit}
            />
          </Group>
          <Group grow>
            <TextInput
              label="Height"
              value={height}
              onChange={(e) => setHeight(e.currentTarget.value)}
              placeholder="Enter your height"
              type="number"
            />
            <SegmentedControl
              data={[
                { label: 'cm', value: 'cm' },
                { label: 'inches', value: 'inches' },
              ]}
              value={heightUnit}
              onChange={setHeightUnit}
            />
          </Group>
          <Radio.Group
            label="Fitness Level"
            value={fitnessLevel}
            onChange={setFitnessLevel}
          >
            <Group mt="xs">
              <Radio value="Beginner" label="Beginner" />
              <Radio value="Intermediate" label="Intermediate" />
              <Radio value="Advanced" label="Advanced" />
            </Group>
          </Radio.Group>
          <CheckboxGroup
            label="Primary Fitness Goal"
            value={fitnessGoals}
            onChange={setFitnessGoals}
          >
            <Checkbox value="Build Strength" label="Build Strength" />
            <Checkbox value="Lose Weight" label="Lose Weight" />
            <Checkbox value="Improve Endurance" label="Improve Endurance" />
            <Checkbox value="General Fitness" label="General Fitness" />
            <Checkbox value="Other" label="Other" />
          </CheckboxGroup>
          <Group justify="space-between" mt="md">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next</Button>
          </Group>
        </Stack>
      </Stepper.Step>

      {/* Step 3: Preferences */}
      <Stepper.Step label="Preferences">
        <Stack>
          <Title order={3}>Almost there! Set your preferences.</Title>
          <Select
            label="Preferred Workout Duration"
            placeholder="Select duration"
            data={[
              { value: '15-30', label: '15-30 min' },
              { value: '30-45', label: '30-45 min' },
              { value: '45-60', label: '45-60 min' },
              { value: '60+', label: '60+ min' },
            ]}
            value={workoutDuration ? workoutDuration.value : null}
            onChange={(_setWorkoutDuration, option) =>
              setWorkoutDuration(option)
            }
          />
          <CheckboxGroup
            label="Available Equipment"
            value={equipment}
            onChange={setEquipment}
          >
            <Checkbox value="None" label="None" />
            <Checkbox value="Pull-up Bar" label="Pull-up Bar" />
            <Checkbox value="Parallel Bars" label="Parallel Bars" />
            <Checkbox value="Rings" label="Rings" />
            <Checkbox value="Weights" label="Weights" />
            <Checkbox value="Resistance Bands" label="Resistance Bands" />
          </CheckboxGroup>
          <Group justify="space-between" mt="md">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button color="teal">Finish</Button>
          </Group>
        </Stack>
      </Stepper.Step>
    </Stepper>
  );
}
