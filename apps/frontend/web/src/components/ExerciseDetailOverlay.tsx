import { useContext, type ReactNode } from 'react';
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

import { ExerciseDetailContext } from '@cwt/context';
import type { Equipment, Muscle } from '@cwt/schema/exercises';

import { getDifficultyVariant } from '../utils';

interface ExerciseMetadataProps {
  title: string;
  children: ReactNode;
}

function ExerciseMetadata({ title, children }: ExerciseMetadataProps) {
  return (
    <Stack gap="xxs">
      <Text
        tt="uppercase"
        size="md"
        fw={700}
        c="gray.7"
        lts="var(--mantine-letter-spacing-wider)"
      >
        {title}
      </Text>
      <Flex
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {children}
      </Flex>
    </Stack>
  );
}

export default function ExerciseDetailOverlay() {
  const exerciseDetail = useContext(ExerciseDetailContext)?.exercise;
  const detailHandlers = useContext(ExerciseDetailContext)?.handlers;
  const detailOpened = useContext(ExerciseDetailContext)?.opened;

  const handleCloseModal = () => {
    if (detailHandlers) {
      detailHandlers.close();
    }
  };
  const muscleMetadata = exerciseDetail?.target_muscles.map(
    (muscle: Muscle, i: number) => {
      return (
        <Badge size="lg" variant="filled-gray" key={i}>
          {muscle}
        </Badge>
      );
    },
  );
  const equipmentMetadata = exerciseDetail?.required_equipment
    ?.filter(
      (equipment): equipment is NonNullable<Equipment> =>
        equipment !== undefined,
    )
    .map((equipment: Equipment, i: number) => {
      return (
        <Badge size="lg" variant="filled" key={i}>
          {equipment}
        </Badge>
      );
    });
  const instructions = exerciseDetail?.instructions.map(
    (instruction: string, i: number) => {
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
    },
  );
  if (!exerciseDetail) {
    return null;
  }

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
              Back to Execises
            </Button>
          </Group>
          <Group justify="flex-start" mt="sm">
            <Title order={2} size="h2">
              {exerciseDetail.name}
            </Title>
          </Group>
          <Stack gap="md" justify="flex-start">
            <ExerciseMetadata title="Difficulty">
              <Badge
                size="lg"
                variant={getDifficultyVariant(exerciseDetail.difficulty)}
              >
                {exerciseDetail.difficulty}
              </Badge>
            </ExerciseMetadata>
            <ExerciseMetadata title="Emphasis">
              <Badge size="lg" variant="light" color="blue">
                {exerciseDetail.emphasis}
              </Badge>
            </ExerciseMetadata>
            <ExerciseMetadata title="Target Muscles">
              {muscleMetadata}
            </ExerciseMetadata>
            <ExerciseMetadata title="Required Equipment">
              {exerciseDetail.required_equipment == null ||
              exerciseDetail.required_equipment.length == 0 ? (
                <Badge color="dark" variant="transparent">
                  ---
                </Badge>
              ) : (
                equipmentMetadata
              )}
            </ExerciseMetadata>
          </Stack>
          <Stack mt="sm">
            <Title order={3} size="h4" tt="uppercase">
              Instructions
            </Title>
            <Stack>{instructions}</Stack>
          </Stack>
        </Stack>
      </Group>
    </Modal>
  );
}
