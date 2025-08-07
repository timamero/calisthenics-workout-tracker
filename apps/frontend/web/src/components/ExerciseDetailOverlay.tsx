import { useContext } from 'react';
import { Modal } from '@mantine/core';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

// import { Exercise } from '@cwt/schema/exerciseSchema';

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
      // opened={opened}
      // onClose={() => handler.close()}
      // title={exercise?.name}
      opened={detailOpened || false}
      onClose={handleCloseModal}
      title={exerciseDetail?.name}
      // fullScreen
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
