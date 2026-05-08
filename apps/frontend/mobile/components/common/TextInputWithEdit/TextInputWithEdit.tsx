import { useEffect } from 'react';

import { useUpdateTextInput } from '@cwt/hooks';

import TextInputWithEditUI from './TextInputWithEditUI';

interface TextInputWithEditProps {
  initialValue: string;
  onSave: (text: string) => void | Promise<void>;
  hideEdit?: boolean;
  variant?: 'title' | 'body';
  maxLength?: number;
  size?: 'lg' | 'md' | 'sm';
}

export default function TextInputWithEdit({
  initialValue,
  onSave,
  hideEdit = false,
  variant = 'body',
  maxLength = 40,
  size = 'lg',
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

  const onTextChange = (text: string) => {
    if (text.length <= maxLength) {
      handleTextChange(text);
    }
  };

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
      onTextChange={onTextChange}
      hideEdit={hideEdit}
      variant={variant}
      size={size}
    />
  );
}
