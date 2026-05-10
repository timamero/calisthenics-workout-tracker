import { useEffect, type ChangeEvent } from 'react';

import { useUpdateTextInput } from '@cwt/hooks';

import TextInputWithEditUI from './TextInputWithEditUI';

interface TextInputWithEditProps {
  initialValue: string;
  onSave: (text: string) => void | Promise<void>;
  hideEdit?: boolean;
  variant?: 'title' | 'body';
  maxLength?: number;
  hideEditLabel?: boolean;
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleOrder?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function TextInputWithEdit({
  initialValue,
  onSave,
  hideEdit = false,
  variant = 'body',
  maxLength = 40,
  hideEditLabel = false,
  titleSize = 'h3',
  titleOrder = 1,
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

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length <= maxLength) {
      handleTextChange(event.currentTarget.value);
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
      hideEditLabel={hideEditLabel}
      titleSize={titleSize}
      titleOrder={titleOrder}
    />
  );
}
