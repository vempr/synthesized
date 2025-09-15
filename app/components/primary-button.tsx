import { Button } from './ui/button';

export default function PrimaryButton({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  return (
    <Button
      asChild={asChild}
      variant="solid"
      colorPalette="red"
      size="sm"
    >
      {children}
    </Button>
  );
}
