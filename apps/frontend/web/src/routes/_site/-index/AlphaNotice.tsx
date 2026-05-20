import { Alert, Text } from '@mantine/core';
import { IoInformationCircleOutline } from 'react-icons/io5';

export default function AlphaNotice() {
  return (
    <Alert
      icon={<IoInformationCircleOutline size={18} />}
      color="violet.9"
      bg="violet.0"
      radius="md"
      mb="xl"
      title="This is an early alpha release."
    >
      <Text fz="xsplus" lh="xxl">
        You may encounter bugs, and workout data may not carry over between
        future releases if breaking changes are required. Your feedback during
        this phase directly shapes what Torque becomes — thank you for being
        part of it.
      </Text>
    </Alert>
  );
}
