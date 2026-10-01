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
        Torque Fit is currently in early alpha. You may encounter bugs, and
        workout data may not carry over between future releases if breaking
        changes are required.
      </Text>
      <Text fz="xsplus" lh="xxl" mt={8}>
        Your input during this phase directly shapes the app. If you run into
        any issues or have feedback, please reach out via email at
        info@torquefit.com. Thank you for helping build Torque Fit!
      </Text>
    </Alert>
  );
}
