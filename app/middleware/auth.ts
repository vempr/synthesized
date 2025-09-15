// import { redirect } from 'react-router';
// import { userContext } from '~/context';
// import type { MiddlewareFunction } from 'react-router';

// export const authMiddleware: MiddlewareFunction<Response> = async ({ request, context }) => {
//   const user = await getUserFromSession(request);
//   if (!user) {
//     throw redirect('/login');
//   }
//   context.set(userContext, user);
// };

// coming back to supabase after their dashboard doesn't have client side errors
