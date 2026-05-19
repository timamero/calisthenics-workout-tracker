import { Stack, Loader, Text } from '@mantine/core';

import { loaderContent } from '@cwt/content';

export default function DefaultLoader() {
  return (
    <Stack align="center" justify="center" h="100%" gap="xs" flex={1}>
      <Stack h={40}>
        <Loader color="lime" />;
      </Stack>
      <Stack align="center" mt="xs" h="100%">
        <Text ff="heading" fz="xl" fw={700}>
          {loaderContent().loadingAppMessage}
        </Text>
      </Stack>
    </Stack>
  );
}
