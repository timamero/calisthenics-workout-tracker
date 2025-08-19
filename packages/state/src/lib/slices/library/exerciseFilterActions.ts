import {
  Exercise,
  ExerciseFilterCheckbox,
  ExerciseAttributes,
} from "@cwt/schema/exercises";

export function updateSelections(
  selections: ExerciseFilterCheckbox[],
  checkbox: ExerciseFilterCheckbox
) {
  return selections.map((s) => {
    if (s.key === checkbox.key && s.selection === checkbox.selection) {
      return {
        ...s,
        value: !s.value,
      };
    }

    return s;
  });
}

export function updateAppliedSelections(selections: ExerciseFilterCheckbox[]) {
  return selections.filter((obj) => obj.value === true);
}

export function clearSelections(selections: ExerciseFilterCheckbox[]) {
  return selections.map((s) => {
    if (s.value === true) {
      return {
        ...s,
        value: false,
      };
    }

    return s;
  });
}

export function revertFilterSelections(
  selections: ExerciseFilterCheckbox[],
  appliedAttributes: ExerciseAttributes[]
) {
  return selections.map((obj) => {
    if (appliedAttributes.includes(obj.selection)) {
      return {
        ...obj,
        value: true,
      };
    }

    return {
      ...obj,
      value: false,
    };
  });
}
