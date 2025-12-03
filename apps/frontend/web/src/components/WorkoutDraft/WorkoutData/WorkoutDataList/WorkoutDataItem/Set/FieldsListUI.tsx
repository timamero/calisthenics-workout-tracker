import { Group } from '@mantine/core';
import type { ReactNode } from 'react';

export default function FieldsListUI({ children }: { children: ReactNode }) {
  return <Group align="center">{children}</Group>;
}
