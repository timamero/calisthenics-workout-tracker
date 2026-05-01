import { useUpdateTextInput } from '@cwt/hooks';

import TextInputWithEditUI from './TextInputWithEditUI';

export default function TextInputWithEdit() {
  const {
    isEditMode,
    text,
    handleEditClick,
    handleSaveClick,
    handleTextChange,
  } = useUpdateTextInput();

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
