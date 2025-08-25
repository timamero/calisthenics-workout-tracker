import { Paper, Stack, UnstyledButton } from '@mantine/core';

export default function ListItemCard() {
  const handleExerciseClick = () => {
    console.log('clicked item');
  };
  return (
    <UnstyledButton onClick={handleExerciseClick}>
      <Paper shadow="lg" p="md" radius="lg" miw={300} maw={460} withBorder>
        <Stack
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="sm"
        >
          Item content here
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}
