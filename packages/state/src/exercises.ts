import { create } from 'zustand';
import { Exercise, Muscles, Equipment, Emphasis, Difficulty } from '@cwt/schema/exerciseSchema';

type Filter = { muscle: Muscles[]; equipment: Equipment[]; emphasis: Emphasis; difficulty: Difficulty}

interface ExercisesState {
  masterExercises: Exercise[];
  displayedExercises: Exercise[];
  filter: Filter;
  search: string;
  setExercises: (exercises: Exercise[]) => void;
  resetDisplayedExercises: () => void;
  setFilter: (filter: Partial<Filter>) => void;
  setSearch: (search: string) => void;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
  masterExercises: [],
  displayedExercises: [],
  filter: {muscle: [], equipment: [], emphasis: "", difficulty: ""},
  search: "",
  setExercises: (exercises) => set({
    masterExercises: exercises,
    displayedExercises: exercises,
  }),
  resetDisplayedExercises: () => set((state) => ({
    displayedExercises: state.masterExercises
  })),
  setFilter: (partial) => set((state) => ({
    filter: { ...state.filter, ...partial}
  })),
  setSearch: (search) => set({ search })
}));