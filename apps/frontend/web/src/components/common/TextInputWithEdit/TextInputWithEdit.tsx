import { useEffect } from 'react';

import { useUpdateTextInput } from '@cwt/hooks';

import TextInputWithEditUI from './TextInputWithEditUI';

interface TextInputWithEditProps {
  initialValue: string;
  onSave: (text: string) => void | Promise<void>;
}

export default function TextInputWithEdit({
  initialValue,
  onSave,
}: TextInputWithEditProps) {
  const {
    isEditMode,
    text,
    setText,
    handleEditClick,
    handleSaveClick,
    handleTextChange,
  } = useUpdateTextInput();

  useEffect(() => {
    setText(initialValue);
  }, [initialValue, setText]);

  return (
    <TextInputWithEditUI
      isEditMode={isEditMode}
      text={text}
      onEditClick={handleEditClick}
      onSaveClick={() => handleSaveClick(() => onSave(text))}
      onTextChange={handleTextChange}
    />
  );
}
