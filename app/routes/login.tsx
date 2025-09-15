import Link from '~/components/ui/link';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Login' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export default function Login() {
  return (
    <div>
      'login form and all that'
      <Link to="/register">Register</Link>
    </div>
  );
}
