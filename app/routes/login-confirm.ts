import { createSupabaseServerClient } from '~/services/supabase.server';
import type { Route } from './+types/login-confirm';
import { userContext } from '~/context';
import { redirect } from 'react-router';

export async function loader({ request, context }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');

  if (!token_hash) {
    throw redirect('/login', { headers: new Headers() });
  }

  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);

  const { data, error } = await supabaseClient.auth.verifyOtp({
    token_hash,
    type: 'email',
  });

  if (error || !data.session || !data.user) {
    throw redirect('/login', { headers: new Headers() });
  }

  context.set(userContext, data.user);
  return redirect('/logbook', { headers });
}
