import { authMiddleware } from '~/middleware/auth';
import type { Route } from './+types/logbook';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Your Personal Logbook' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export default function Logbook() {
  return 'log book!';
}
