import { create } from 'zustand';
import { Exercise, Muscles, Equipment, Emphasis, Difficulty } from '@cwt/schema/exerciseSchema';

type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis; difficulty: Difficulty}

interface ExercisesState {
  masterExercises: Exercise[] | null;
  displayedExercises: Exercise[] | null;
  filter: Filter;
  search: string;
  setMasterExercises: (masterExercises: Exercise[]) => void;
  setDisplayedExercises: (displayed: Exercise[]) => void;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
  masterExercises: null,
  displayedExercises: null,
  filter: {muscle: [""], equipment: [""], emphasis: "", difficulty: ""},
  search: "",
  setMasterExercises: (masterExercises) => set({ masterExercises }),
  setDisplayedExercises: (displayedExercises) => set({ displayedExercises }),
}));