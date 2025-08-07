import { useContext } from 'react';
import { Modal } from '@mantine/core';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

export default function ExerciseDetailOverlay() {
  const exerciseDetail = useContext(ExerciseDetailContext)?.exercise;
  const detailHandlers = useContext(ExerciseDetailContext)?.handlers;
  const detailOpened = useContext(ExerciseDetailContext)?.opened;

  const handleCloseModal = () => {
    if (detailHandlers) {
      detailHandlers.close();
    }
  };
  return (
    <Modal
      opened={detailOpened || false}
      onClose={handleCloseModal}
      title={exerciseDetail?.name}
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
