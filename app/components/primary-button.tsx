import { Button } from './ui/button';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

export default function PrimaryButton({ children, ...props }: ButtonProps & { children: React.ReactNode }) {
  return (
    <Button
      variant="solid"
      colorPalette="red"
      size="sm"
      {...props}
    >
      {children}
    </Button>
  );
}
