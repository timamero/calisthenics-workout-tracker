import { Title, TextInput, Button, Group } from '@mantine/core';

interface TextInputWithEditProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onTextChange: (value: string) => void;
}

export default function TextInputWithEditUI({
  isEditMode,
  text,
  onEditClick,
  onSaveClick,
  onTextChange,
}: TextInputWithEditProps) {
  return (
    <>
      {!isEditMode && (
        <Group>
          <Title size="h6">{text}</Title>
          <Button onClick={onEditClick} variant="outline" color="dark">
            Edit Title
          </Button>
        </Group>
      )}
      {isEditMode && (
        <Group>
          <TextInput
            value={text}
            onChange={(event) => onTextChange(event.currentTarget.value)}
          />
          <Button onClick={onSaveClick} variant="outline" color="dark">
            Save
          </Button>
        </Group>
      )}
    </>
  );
}
