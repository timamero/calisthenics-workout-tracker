import { type ReactNode } from 'react';
import { Button, type ButtonProps } from 'react-native-paper';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

export default function CustomButton({ children, ...rest }: CustomButtonProps) {
  return (
    <Button
      labelStyle={[{ fontFamily: 'Manrope-SemiBold' }, rest.labelStyle]}
      {...rest}
    >
      {children}
    </Button>
  );
}
