import { authMiddleware } from '~/middleware/auth';
import type { Route } from './+types/logbook-session-delete';
import { createSupabaseServerClient } from '~/services/supabase.server';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ request }: Route.ActionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);
  const form = await request.formData();

  const id = parseInt(String(form.get(`session-exercise-id`)));
  if (!id) {
    return { error: 'Name is required', success: false };
  }

  const { error } = await supabaseClient.from('training_session_exercises').delete().eq('id', id).single();

  if (error) {
    return { error: 'Deleting session exercise failed. Please try again later', success: false };
    // protect training_session_exercise owner from attackers knowing id
  }

  return { error: null, success: true };
}

export type DeleteAction = typeof action;
