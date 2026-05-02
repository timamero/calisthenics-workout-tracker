import { Title, TextInput, Button, Group } from '@mantine/core';

interface TextInputWithEditUIProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTextChange: (value: string) => void;
}

export default function TextInputWithEditUI({
  isEditMode,
  text,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onTextChange,
}: TextInputWithEditUIProps) {
  return (
    <>
      {!isEditMode && (
        <Group>
          <Title size="h6">{text}</Title>
          <Button
            size="compact-sm"
            onClick={onEditClick}
            variant="outline"
            color="dark"
          >
            Edit
          </Button>
        </Group>
      )}
      {isEditMode && (
        <Group>
          <TextInput
            w="100%"
            value={text}
            onChange={(event) => onTextChange(event.currentTarget.value)}
          />
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
      )}
    </>
  );
}
