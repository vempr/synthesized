import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Login' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export function loader({ request }: Route.LoaderArgs) {}

export default function Login() {
  return <div>'email magic link and all that'</div>;
}
