import { Modal } from '@mantine/core';

interface ExerciseDetailOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function ExerciseDetailOverlay({
  opened,
  handler,
}: ExerciseDetailOverlayProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => handler.close()}
      title="Exercise name"
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
      <p>Exercise details</p>
    </Modal>
  );
}
