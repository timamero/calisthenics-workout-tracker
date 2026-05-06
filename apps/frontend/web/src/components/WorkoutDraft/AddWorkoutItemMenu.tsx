// import { Stack, Button } from '@mantine/core';
// import { Link } from '@tanstack/react-router';

// import { useAddSuperset } from '@cwt/hooks';
// import { useWorkoutDraftStore } from '@cwt/state/stores';

import AddMenu from '../common/AddMenu';

export default function AddWorkoutItemMenu() {
  // const addSection = useWorkoutDraftStore((state) => state.addSection);
  // const handleAddSupersetClick = useAddSuperset().handleAddSupersetClick;

  return (
    <AddMenu />
    // <Stack>
    //   <Button
    //     variant="filled"
    //     color="orange.9"
    //     component={Link}
    //     to="/workout/add-exercise"
    //   >
    //     Add Exercise
    //   </Button>
    //   <Button variant="filled" color="orange.9" onClick={() => addSection()}>
    //     Add Section
    //   </Button>
    //   <Button
    //     variant="filled"
    //     color="orange.9"
    //     onClick={() => handleAddSupersetClick()}
    //   >
    //     Add Superset
    //   </Button>
    // </Stack>
  );
}
