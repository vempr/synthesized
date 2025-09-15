import { Outlet } from 'react-router';
import { NavLink } from 'react-router';
import { ColorModeButton } from '~/components/ui/color-mode';
import Link from '~/components/ui/link';

export default function AppLayout() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="/wiki">Composition Wiki</Link>
        <Link to="/lb">Logbook</Link>

        <ColorModeButton />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
