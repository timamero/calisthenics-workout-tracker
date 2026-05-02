import { useEffect } from 'react';

import { useUpdateTextInput } from '@cwt/hooks';

import TextInputWithEditUI from './TextInputWithEditUI';

export default function TextInputWithEdit({
  initialValue,
}: {
  initialValue: string;
}) {
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
      onSaveClick={handleSaveClick}
      onTextChange={handleTextChange}
    />
  );
}
