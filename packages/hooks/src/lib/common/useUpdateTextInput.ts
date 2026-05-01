import { useState } from "react";

export default function useUpdateTextInput() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const handleEditClick = () => setIsEditMode(true);
  const handleSaveClick = () => setIsEditMode(false);
  const handleTextChange = (value: string) => setText(value);

  return {
    isEditMode,
    text,
    handleEditClick,
    handleSaveClick,
    handleTextChange,
  };
}
