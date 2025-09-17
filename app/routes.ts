import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/app-layout.tsx', [
    index('routes/home.tsx'),
    route('wiki', 'routes/wiki.tsx'),

    layout('./layouts/wiki-layout.tsx', [route('wiki/back', 'routes/wiki.back.tsx'), route('wiki/front', 'routes/wiki.front.tsx')]),

    route('logbook', 'routes/logbook.tsx'),
    route('login', 'routes/login.tsx'),
    route('login-confirm', 'routes/login-confirm.ts'),
  ]),
] satisfies RouteConfig;
