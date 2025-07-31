import { create } from 'zustand';
// Need to export exercises schemas
interface ExercisesState {
  masterExercises: any;
  displayedExercises: any;
  filter: any;
  search: string;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
  masterExercises: null,
  displayedExercises: null,
  filter: null,
  search: "",
}));