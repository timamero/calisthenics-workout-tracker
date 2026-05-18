import type { ChangeEvent } from 'react';
import {
  Title,
  TextInput,
  Button,
  Group,
  Text,
  Stack,
  ActionIcon,
  useMatches,
} from '@mantine/core';
import type { TitleOrder, TitleSize } from '@mantine/core';
import { IoPencil } from 'react-icons/io5';

interface TextInputWithEditUIProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hideEdit: boolean;
  variant: 'title' | 'body';
  hideEditLabel?: boolean;
  titleSize: TitleSize;
  titleOrder: TitleOrder;
}

export default function TextInputWithEditUI({
  isEditMode,
  text,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onTextChange,
  hideEdit,
  variant,
  hideEditLabel,
  titleSize,
  titleOrder,
}: TextInputWithEditUIProps) {
  console.log('TextInputWithEditUI |titleSize', titleSize);
  const appliedSize = useMatches({
    base:
      titleSize === 'h1'
        ? 'h3'
        : titleSize === 'h2'
          ? 'h4'
          : titleSize === 'h3'
            ? 'h5'
            : titleSize === 'h4' || titleSize === 'h5'
              ? 'h5'
              : 'h6',
    // base: titleSize === 'h2' ? 'h3' : 'h4',
    md: titleSize,
  });
  console.log('TextInputWithEditUI | appliedSize', appliedSize);
  return (
    <>
      {!isEditMode && (
        <Group wrap="nowrap" justify="center">
          {variant === 'title' ? (
            <Title size={appliedSize} order={titleOrder} maw={400}>
              {text}
            </Title>
          ) : (
            <Text maw={400}>{text}</Text>
          )}

          {!hideEdit &&
            (hideEditLabel === true ? (
              <ActionIcon
                variant="outline"
                onClick={onEditClick}
                // size="sm"
                aria-label="Edit title"
                size="md"
              >
                <IoPencil size={16} />
              </ActionIcon>
            ) : (
              <Button
                size="compact-sm"
                onClick={onEditClick}
                variant="outline"
                color="dark"
                leftSection={<IoPencil size={16} />}
              >
                Edit
              </Button>
            ))}
        </Group>
      )}
      {isEditMode && (
        <Stack maw={400} w="100%" gap={4}>
          <TextInput
            mod={{ isTitleH1: titleOrder === 1, isTitleH2: titleOrder === 2 }}
            w="100%"
            value={text}
            onChange={onTextChange}
          />
          <Group justify="flex-end">
            <Button
              onClick={() => onCancelClick()}
              size="compact-sm"
              variant="subtle"
              color="dark"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSaveClick()}
              size="compact-sm"
              variant="outline"
              color="dark"
            >
              Save
            </Button>
          </Group>
        </Stack>
      )}
    </>
  );
}
