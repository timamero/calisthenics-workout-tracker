import type { ChangeEvent } from 'react';
import { Title, TextInput, Button, Group, Text, Stack } from '@mantine/core';

interface TextInputWithEditUIProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hideEdit: boolean;
  variant: 'title' | 'body';
}

export default function TextInputWithEditUI({
  isEditMode,
  text,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onTextChange,
  hideEdit,
  variant,
}: TextInputWithEditUIProps) {
  return (
    <>
      {!isEditMode && (
        <Group wrap="nowrap" justify="center">
          {variant === 'title' ? (
            <Title size="h3" maw={400}>
              {text}
            </Title>
          ) : (
            <Text maw={400}>{text}</Text>
          )}

          {!hideEdit && (
            <Button
              size="compact-sm"
              onClick={onEditClick}
              variant="outline"
              color="dark"
            >
              Edit
            </Button>
          )}
        </Group>
      )}
      {isEditMode && (
        <Stack maw={400} w="100%" gap={4}>
          <TextInput w="100%" value={text} onChange={onTextChange} />
          <Group justify="flex-end">
            <Button
              onClick={() => onCancelClick()}
              size="compact-sm"
              variant="subtle"
              color="dark"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSaveClick()}
              size="compact-sm"
              variant="outline"
              color="dark"
            >
              Save
            </Button>
          </Group>
        </Stack>
      )}
    </>
  );
}
