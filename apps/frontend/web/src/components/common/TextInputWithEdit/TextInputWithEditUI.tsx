import { Title, TextInput, Button, Group } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

interface TextInputWithEditProps {
  mode: Mode;
  isEditMode: boolean;
  workoutTitle: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onTitleChange: (value: string) => void;
}

export default function TextInputWithEdit({
  mode,
  isEditMode,
  workoutTitle,
  onEditClick,
  onSaveClick,
  onTitleChange,
}: TextInputWithEditProps) {
  return (
    <>
      {!isEditMode && (
        <Group>
          <Title size="h6">{workoutTitle}</Title>
          {mode !== 'log' && (
            <Button onClick={onEditClick} variant="outline" color="dark">
              Edit Title
            </Button>
          )}
        </Group>
      )}
      {isEditMode && (
        <Group>
          <TextInput
            value={workoutTitle}
            onChange={(event) => onTitleChange(event.currentTarget.value)}
          />
          <Button onClick={onSaveClick} variant="outline" color="dark">
            Save
          </Button>
        </Group>
      )}
    </>
  );
}
