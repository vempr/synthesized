import { authMiddleware } from '~/middleware/auth';
import type { Route } from './+types/logbook-session-edit';
import { createSupabaseServerClient } from '~/services/supabase.server';
import { userContext, type User } from '~/context';
import z from 'zod';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ request, context }: Route.ActionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);
  const form = await request.formData();

  const id = parseInt(String(form.get(`session-exercise-id`)));
  const name = String(form.get(`exercise-name`));
  const sets = parseInt(String(form.get(`exercise-sets`)));
  const reps = parseInt(String(form.get(`exercise-reps`)));
  const breakTime = parseInt(String(form.get(`exercise-break_time`)));

  if (!name) {
    return { error: 'Name is required', success: false };
  }

  try {
    z.string().min(1).max(255).parse(name);
    z.number().min(1).max(10000).nullable().parse(sets);
    z.number().min(1).max(10000).nullable().parse(reps);
    z.number().min(1).max(10000).nullable().parse(breakTime);
  } catch (err) {
    console.log(err);
    return {
      error: 'Invalid form inputs: Sets, repetitions and break times must have a minimum value of 1. Name can not be longer than 255 characters.',
      success: false,
    };
  }

  const { data } = await supabaseClient.from('training_session_exercises').select().eq('id', id).single();

  if (!data) {
    return { error: 'Training session does not exist', success: false };
    // protect training_session_exercise owner from attackers knowing id
  }

  const user = context.get(userContext) as User;
  const { data: exercise, error: upsertError } = await supabaseClient
    .from('exercises')
    .upsert(
      {
        name,
        user_id: user.id,
      },
      {
        onConflict: 'name,user_id',
      },
    )
    .select()
    .single();

  if (upsertError) {
    console.error('Error inserting exercise: ', upsertError);
    return { error: upsertError, success: false };
  }

  const { error: sessionError } = await supabaseClient
    .from('training_session_exercises')
    .update({ break_time: breakTime, exercise_id: exercise.id, reps: reps, sets: sets })
    .eq('id', id);

  if (sessionError) {
    console.error('Error inserting training session exercise: ', sessionError);
    return { error: sessionError, success: false };
  }

  return { error: null, success: true };
}

export type EditAction = typeof action;
