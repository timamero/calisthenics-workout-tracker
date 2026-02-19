import { useContext } from 'react';
import {
  Modal,
  Stack,
  // Text,
  // Badge,
  // Flex,
  Group,
  Button,
  Title,
} from '@mantine/core';

// import { ExerciseDetailContext } from '@cwt/context';
import { WorkoutLogDetailContext } from '@cwt/context';
// import type { Equipment, Muscle } from '@cwt/schema/exercises';

export default function WorkoutLogDetailOverlay() {
  const workoutLogDetail = useContext(WorkoutLogDetailContext)?.workout;
  const detailHandlers = useContext(WorkoutLogDetailContext)?.handlers;
  const detailOpened = useContext(WorkoutLogDetailContext)?.opened;

  console.log('workout log details', workoutLogDetail);

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
          {/* <Flex direction="row" wrap="wrap" gap="xl" justify="flex-start">
            <Stack>
              <Text tt="uppercase" size="md" c="gray.7">
                Difficulty
              </Text>
              <Badge size="lg" color={difficultyColor}>
                {exerciseDetail?.difficulty}
              </Badge>
            </Stack>
            <Stack>
              <Text tt="uppercase" size="md" c="gray.7">
                Emphasis
              </Text>
              <Badge size="lg" color="dark" variant="outline" bg="gray.1">
                {exerciseDetail?.emphasis}
              </Badge>
            </Stack>
            <Stack>
              <Text tt="uppercase" size="md" c="gray.7">
                Target Muscles
              </Text>
              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                {muscleMetadata}
              </Flex>
            </Stack>
            <Stack>
              <Text tt="uppercase" size="md" c="gray.7">
                Required Equipment
              </Text>
              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                {exerciseDetail?.required_equipment == null ||
                exerciseDetail.required_equipment.length == 0 ? (
                  <Badge color="dark" variant="transparent">
                    ---
                  </Badge>
                ) : (
                  equipmentMetadata
                )}
              </Flex>
            </Stack>
          </Flex> */}
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
