import { Title, TextInput, Button, Group } from '@mantine/core';

interface WorkoutTitleProps {
  isEditMode: boolean;
  workoutTitle: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onTitleChange: (value: string) => void;
}

export default function WorkoutTitle({
  isEditMode,
  workoutTitle,
  onEditClick,
  onSaveClick,
  onTitleChange,
}: WorkoutTitleProps) {
  return (
    <>
      {!isEditMode && (
        <Group>
          <Title size="h6">{workoutTitle}</Title>
          <Button onClick={onEditClick} variant="outline" color="dark">
            Edit Title
          </Button>
        </Group>
      )}
      {isEditMode && (
        <Group>
          <TextInput
            value={workoutTitle}
            onChange={(event) => onTitleChange(event.currentTarget.value)}
          />
          <Button onClick={onSaveClick} variant="outline" color="dark">
            Save
          </Button>
        </Group>
      )}
    </>
  );
}

// import { useState } from 'react';
// import { Title, TextInput, Button, Group } from '@mantine/core';

// // import { useStore } from '@cwt/state/store';
// import { useWorkoutDraftStore } from '@cwt/state/stores';

// export default function WorkoutTitle() {
//   const [isEditMode, setIsEditMode] = useState<boolean>(false);
//   const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
//   const setWorkoutTitle = useWorkoutDraftStore(
//     (state) => state.setWorkoutTitle,
//   );
//   return (
//     <>
//       {!isEditMode && (
//         <Group>
//           <Title size="h6">{workoutTitle}</Title>
//           <Button
//             onClick={() => setIsEditMode(true)}
//             variant="outline"
//             color="dark"
//           >
//             Edit Title
//           </Button>
//         </Group>
//       )}
//       {isEditMode && (
//         <Group>
//           <TextInput
//             value={workoutTitle!}
//             onChange={(event) => setWorkoutTitle(event.currentTarget.value)}
//           />
//           <Button
//             onClick={() => setIsEditMode(false)}
//             variant="outline"
//             color="dark"
//           >
//             Save
//           </Button>
//         </Group>
//       )}
//     </>
//   );
// }
