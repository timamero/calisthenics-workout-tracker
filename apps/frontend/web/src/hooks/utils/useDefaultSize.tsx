import { useMatches } from '@mantine/core';

export default function useDefaultSize() {
  return useMatches({ base: 'sm', md: 'md' });
}
