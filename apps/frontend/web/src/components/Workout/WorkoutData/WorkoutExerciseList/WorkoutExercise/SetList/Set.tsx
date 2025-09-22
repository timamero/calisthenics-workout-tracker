import { Stack, Text, Group, Button } from '@mantine/core';

interface SetProps {
  setIndex: number;
  showDeleteButton: boolean;
  onDeleteSetClick: () => void;
}

export default function Set({
  setIndex,
  showDeleteButton,
  onDeleteSetClick,
}: SetProps) {
  console.log(showDeleteButton);
  return (
    <Stack bg="gray.1">
      <Group>
        <Text>{`Set ${setIndex + 1}`}</Text>
        <Button color="red" variant="white" onClick={() => onDeleteSetClick()}>
          Delete
        </Button>
      </Group>
      {/* {fields} */}
      <div>fields list placeholder</div>
    </Stack>
  );
}
