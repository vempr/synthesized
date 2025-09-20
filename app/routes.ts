import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/app-layout.tsx', [
    index('routes/home.tsx'),
    route('wiki', 'routes/wiki.tsx'),
    route('account', 'routes/account.tsx'),

    layout('./layouts/wiki-layout.tsx', [route('wiki/back', 'routes/wiki.back.tsx'), route('wiki/front', 'routes/wiki.front.tsx')]),

    route('logbook', 'routes/logbook.tsx'),
    route('logbook/:sessionId', 'routes/logbook-session.tsx'),
    route('logbook/edit', 'routes/logbook-session-edit.ts'),
    route('logbook/delete', 'routes/logbook-session-delete.ts'),

    route('login', 'routes/login.tsx'),
    route('login-confirm', 'routes/login-confirm.ts'),
  ]),
] satisfies RouteConfig;
