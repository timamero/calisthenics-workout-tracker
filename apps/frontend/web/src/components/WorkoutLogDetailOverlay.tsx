import { useContext } from 'react';
import {
  Modal,
  Stack,
  Text,
  // Badge,
  // Flex,
  Group,
  Button,
  Title,
} from '@mantine/core';

// import { ExerciseDetailContext } from '@cwt/context';
import { WorkoutLogDetailContext } from '@cwt/context';
import { formatDuration } from '@cwt/utils';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';
// import type { Equipment, Muscle } from '@cwt/schema/exercises';

export default function WorkoutLogDetailOverlay() {
  const workoutLogDetail = useContext(WorkoutLogDetailContext)!
    .workout as WorkoutLogResponse;
  const detailHandlers = useContext(WorkoutLogDetailContext)?.handlers;
  const detailOpened = useContext(WorkoutLogDetailContext)?.opened;

  console.log('workout log details', workoutLogDetail);

  const duration = formatDuration(workoutLogDetail.duration!);
  const date = new Date(workoutLogDetail.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCloseModal = () => {
    if (detailHandlers) {
      detailHandlers.close();
    }
  };
  // const muscleMetadata = exerciseDetail?.target_muscles.map(
  //   (muscle: Muscle, i: number) => {
  //     return (
  //       <Badge size="lg" variant="light" color="grape" key={i}>
  //         {muscle}
  //       </Badge>
  //     );
  //   },
  // );
  // const equipmentMetadata = exerciseDetail?.required_equipment
  //   ?.filter(
  //     (equipment): equipment is NonNullable<Equipment> =>
  //       equipment !== undefined,
  //   )
  //   .map((equipment: Equipment, i: number) => {
  //     return (
  //       <Badge size="lg" color="dark" variant="outline" key={i}>
  //         {equipment}
  //       </Badge>
  //     );
  //   });
  // const instructions = exerciseDetail?.instructions.map(
  //   (instruction: string, i: number) => {
  //     const regex = /\d\. /g;
  //     return (
  //       <Group key={i} wrap="nowrap" align="flex-start">
  //         <Text
  //           size="xl"
  //           fw={700}
  //           style={{
  //             borderBottom: `1px solid var(--mantine-color-dark-6)`,
  //             borderRight: `1px solid var(--mantine-color-dark-6)`,
  //             paddingInline: 8,
  //           }}
  //         >
  //           {i + 1}
  //         </Text>
  //         <Text>{instruction.split(regex)[1]}</Text>
  //       </Group>
  //     );
  //   },
  // );
  return (
    <Modal
      opened={detailOpened || false}
      onClose={handleCloseModal}
      size="xl"
      withCloseButton={false}
    >
      <Group justify="center">
        <Stack mb="lg" maw={580}>
          <Group justify="flex-end">
            <Button variant="outline" color="dark" onClick={handleCloseModal}>
              Back to Workouts
            </Button>
          </Group>
          <Group justify="flex-start" mt="sm">
            <Title order={2} size="h2">
              {workoutLogDetail?.title}
            </Title>
          </Group>
          <Stack gap="md" justify="flex-start">
            <Stack gap="xs">
              <Text tt="uppercase" size="xs" c="gray.7">
                Date
              </Text>
              <Text size="md">{date}</Text>
            </Stack>
            <Stack gap="xs">
              <Text tt="uppercase" size="xs" c="gray.7">
                Description
              </Text>
              <Text size="md">{workoutLogDetail?.description}</Text>
            </Stack>
            <Stack gap="xs">
              <Text tt="uppercase" size="xs" c="gray.7">
                Goal
              </Text>
              <Text size="md">{workoutLogDetail?.goal}</Text>
            </Stack>
            <Stack gap="xs">
              <Text tt="uppercase" size="xs" c="gray.7">
                Duration
              </Text>
              <Text size="md">{duration}</Text>
            </Stack>
          </Stack>
          {/* <Stack mt="sm">
            <Title order={3} size="h4" tt="uppercase">
              Instructions
            </Title>
            <Stack>{instructions}</Stack>
          </Stack> */}
        </Stack>
      </Group>
    </Modal>
  );
}
