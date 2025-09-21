import { redirect } from 'react-router';
import { userContext } from '~/context';
import type { MiddlewareFunction } from 'react-router';
import { createSupabaseServerClient } from '~/services/supabase.server';

export const authMiddleware: MiddlewareFunction<Response> = async ({ request, context }, next) => {
  console.log('=== AUTH MIDDLEWARE START ===');

  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);

  // Log all cookies for debugging
  const cookies = request.headers.get('Cookie') || '';
  console.log('Raw cookies:', cookies);
  console.log('Has auth cookie:', cookies.includes('sb-raxnmrkzivpvwmzirqfc-auth-token'));

  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  console.log('Supabase getUser result:', { user: user?.email, error });
  console.log('User context before:', context.get(userContext));

  if (!user) {
    console.log('No user found, redirecting to login');
    throw redirect('/login', { headers });
  }

  context.set(userContext, user);
  console.log('User set in context:', user.email);
  console.log('=== AUTH MIDDLEWARE END ===');

  const res = await next();
  return res;
};
