import { Alert, Text } from '@mantine/core';
import { IoInformationCircleOutline } from 'react-icons/io5';

export default function AlphaNotice() {
  return (
    <Alert
      icon={<IoInformationCircleOutline size={18} />}
      color="dark.7"
      bg="lime.0"
      radius="md"
      mb="xl"
      title="A Note from the Developer."
    >
      <Text fz="xsplus" lh="xxl">
        Hi! Building Torque Fit has been a personal passion project combining
        two things I love: coding and calisthenics. As a solo developer, I’m
        dedicated to continuously refining Torque Fit through regular releases
        by adding new features, improving performance, and ensuring a secure,
        reliable logging experience.
      </Text>
      <Text fz="xsplus" lh="xxl" mt={8}>
        Thank you for testing Torque Fit during this alpha release and helping
        shape what it becomes!
      </Text>
      <Text fz="xsplus" lh="xxl" mt={8}>
        — Anne Camero
      </Text>
    </Alert>
  );
}
