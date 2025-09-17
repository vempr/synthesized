import { redirect } from 'react-router';
import { userContext } from '~/context';
import type { MiddlewareFunction } from 'react-router';
import { createSupabaseServerClient } from '~/services/supabase.server';

export const authMiddleware: MiddlewareFunction<Response> = async ({ request, context }) => {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw redirect('/login', { headers });
  }
  context.set(userContext, user);
};
