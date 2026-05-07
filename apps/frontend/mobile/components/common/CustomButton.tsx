import { type ReactNode } from 'react';
import { Button } from 'react-native-paper';

export default function CustomButton({ children }: { children: ReactNode }) {
  return (
    <Button labelStyle={{ fontFamily: 'Manrope-SemiBold' }}>{children}</Button>
  );
}
