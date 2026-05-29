import { FilterCheckbox, Attributes } from '@cwt/schema/exercises';

export function updateSelections(
  selections: FilterCheckbox[],
  checkbox: FilterCheckbox,
): FilterCheckbox[] {
  return selections.map((s) => {
    if (s.keyName === checkbox.keyName && s.selection === checkbox.selection) {
      return {
        ...s,
        value: !s.value,
      };
    }

    return s;
  });
}

export function updateAppliedSelections(
  selections: FilterCheckbox[],
): FilterCheckbox[] {
  return selections.filter((obj) => obj.value === true);
}

export function clearSelections(
  selections: FilterCheckbox[],
): FilterCheckbox[] {
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
  selections: FilterCheckbox[],
  appliedAttributes: Attributes[],
): FilterCheckbox[] {
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
