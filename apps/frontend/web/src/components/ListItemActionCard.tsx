import { Paper, Stack, UnstyledButton } from '@mantine/core';

export default function ListItemActionCard() {
  const handleClick = () => {
    console.log('clicked item');
  };
  return (
    <UnstyledButton onClick={handleClick}>
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
