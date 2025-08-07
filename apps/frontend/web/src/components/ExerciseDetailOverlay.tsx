import { useContext } from 'react';
import { Modal } from '@mantine/core';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

// import { Exercise } from '@cwt/schema/exerciseSchema';

export default function ExerciseDetailOverlay() {
  const exerciseDetail = useContext(ExerciseDetailContext);
  return (
    <Modal
      // opened={opened}
      // onClose={() => handler.close()}
      // title={exercise?.name}
      opened={false}
      onClose={() => console.log('close')}
      title={exerciseDetail?.exercise.name}
      fullScreen
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
