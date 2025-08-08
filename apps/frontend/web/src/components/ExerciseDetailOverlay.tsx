import { useContext } from 'react';
import {
  Modal,
  Stack,
  Text,
  Badge,
  Flex,
  Group,
  Button,
  Title,
} from '@mantine/core';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

export default function ExerciseDetailOverlay() {
  const exerciseDetail = useContext(ExerciseDetailContext)?.exercise;
  const detailHandlers = useContext(ExerciseDetailContext)?.handlers;
  const detailOpened = useContext(ExerciseDetailContext)?.opened;

  const difficultyColor =
    exerciseDetail?.difficulty == 'beginner'
      ? 'blue'
      : exerciseDetail?.difficulty == 'intermediate'
        ? 'yellow'
        : 'red';

  const handleCloseModal = () => {
    if (detailHandlers) {
      detailHandlers.close();
    }
  };
  const muscleMetadata = exerciseDetail?.target_muscles.map((muscle, i) => {
    return (
      <Badge size="lg" variant="light" color="grape" key={i}>
        {muscle}
      </Badge>
    );
  });
  const equipmentMetadata = exerciseDetail?.required_equipment?.map(
    (equipment, i) => {
      return (
        <Badge size="lg" color="dark" variant="outline" key={i}>
          {equipment}
        </Badge>
      );
    },
  );
  const instructions = exerciseDetail?.instructions.map((instruction, i) => {
    const regex = /\d\. /g;
    return (
      <Group key={i} wrap="nowrap" align="flex-start">
        <Text
          size="xl"
          fw={700}
          style={{
            borderBottom: `1px solid var(--mantine-color-dark-6)`,
            borderRight: `1px solid var(--mantine-color-dark-6)`,
            paddingInline: 8,
          }}
        >
          {i + 1}
        </Text>
        <Text>{instruction.split(regex)[1]}</Text>
      </Group>
    );
  });
  return (
    <Modal
      opened={detailOpened || false}
      onClose={handleCloseModal}
      fullScreen
      withCloseButton={false}
    >
      <Stack mb="lg">
        <Group justify="flex-end">
          <Button variant="outline" color="dark" onClick={handleCloseModal}>
            Back to Execises
          </Button>
        </Group>
        <Group justify="flex-start" mt="sm">
          <Title order={2} size="h3">
            {exerciseDetail?.name}
          </Title>
        </Group>
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
          <Badge size="lg" color="dark" variant="outline" bg="orange.1">
            {exerciseDetail?.emphasis}
          </Badge>
        </Stack>
        <Text tt="uppercase" size="md" c="gray.7">
          Target Muscles
        </Text>
        <Flex
          // mih={50}
          // bg="rgba(0, 0, 0, .3)"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {muscleMetadata}
        </Flex>
        <Text tt="uppercase" size="md" c="gray.7">
          Required Equipment
        </Text>
        <Flex
          // mih={50}
          // bg="rgba(0, 0, 0, .3)"
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
        <Stack mt="sm">
          <Title order={3} size="h4" tt="uppercase">
            Instructions
          </Title>
          <Stack>{instructions}</Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}

// {
//     id: 1,
//     name: 'Standard Push-Up',
//     target_muscles: ['chest', 'triceps', 'shoulders'],
//     required_equipment: [],
//     emphasis: 'strength',
//     difficulty: 'beginner',
//     tags: ['push', 'upper'],
//     instructions: [
//       '1. Start in a strong plank position. Hands slightly wider than shoulders. Fingers forward.',
//       '2. Lower your chest towards the floor, keeping elbows close to your body and core tight.',
//       '3. Push through your palms, extending arms fully to return to the plank.',
//       '4. Keep your body straight throughout the movement.',
//     ],
//   },
