import { useEffect } from 'react';

import { useUpdateTextInput } from '@cwt/hooks';

import TextInputWithEditUI from './TextInputWithEditUI';

interface TextInputWithEditProps {
  initialValue: string;
  onSave: (text: string) => void | Promise<void>;
  hideEdit?: boolean;
}

export default function TextInputWithEdit({
  initialValue,
  onSave,
  hideEdit = false,
}: TextInputWithEditProps) {
  const {
    isEditMode,
    text,
    setText,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleTextChange,
  } = useUpdateTextInput(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue, setText]);

  return (
    <TextInputWithEditUI
      isEditMode={isEditMode}
      text={text}
      onEditClick={handleEditClick}
      onCancelClick={handleCancelClick}
      onSaveClick={() =>
        handleSaveClick(() => (text === initialValue ? null : onSave(text)))
      }
      onTextChange={handleTextChange}
      hideEdit={hideEdit}
    />
  );
}
