import { useState } from "react";

export default function useUpdateTextInput(initialValue: string = "") {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const handleEditClick = () => setIsEditMode(true);
  const handleCancelClick = () => {
    setText(initialValue);
    setIsEditMode(false);
  };
  const handleSaveClick = (onSave: null | (() => void) = null) => {
    if (onSave) {
      onSave();
    }
    setIsEditMode(false);
  };
  const handleTextChange = (value: string) => setText(value);

  return {
    isEditMode,
    text,
    setText,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleTextChange,
  };
}
