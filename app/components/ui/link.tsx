import { Link as ChakraLink } from '@chakra-ui/react';
import { NavLink } from 'react-router';

export default function Link({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <ChakraLink
      asChild
      color="color"
      focusRing="none"
    >
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? 'font-bold' : 'font-normal')}
      >
        {children}
      </NavLink>
    </ChakraLink>
  );
}
