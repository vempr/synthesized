import { Link as ChakraLink } from '@chakra-ui/react';
import { NavLink } from 'react-router';

export default function Link({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <ChakraLink
      asChild
      color="color"
    >
      <NavLink to={to}>{children}</NavLink>
    </ChakraLink>
  );
}
