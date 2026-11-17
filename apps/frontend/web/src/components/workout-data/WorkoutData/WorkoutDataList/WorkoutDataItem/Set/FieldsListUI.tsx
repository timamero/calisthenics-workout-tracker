import { Group } from '@mantine/core';
import type { ReactNode } from 'react';

export default function FieldsListUI({ children }: { children: ReactNode }) {
  return (
    <Group gap="xs" align="center">
      {children}
    </Group>
  );
}
