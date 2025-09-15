import type { Route } from './+types/home';
import Link from '~/components/ui/link';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Register' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export default function Login() {
  return (
    <div>
      'register form and all that'
      <Link to="/login">Login</Link>
    </div>
  );
}
