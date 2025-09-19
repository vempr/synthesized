import { createSupabaseServerClient } from '~/services/supabase.server';
import type { Route } from './+types/login';
import { useFetcher, redirect } from 'react-router';
import { Center, Field, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import PrimaryButton from '~/components/primary-button';
import z from 'zod';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Login' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user) {
    throw redirect('/account', { headers });
  }
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.formData();
  let email = body.get('email');

  try {
    z.email().parse(email);
  } catch (err) {
    console.log(err);
    return { error: 'Not a valid email' };
  }

  email = email as string;

  const { supabaseClient } = createSupabaseServerClient(request, request.headers);

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: 'http://localhost:5173/logbook',
    },
  });

  if (error) {
    return { error: 'email/supabase error: ' + error.message };
  } else {
    return { success: true };
  }
}

export default function Login() {
  const fetcher = useFetcher<typeof action>();

  return (
    <Center>
      <fetcher.Form
        method="post"
        className="w-72"
      >
        <Heading
          size="3xl"
          as="h1"
          marginBottom="5"
        >
          Login
        </Heading>

        <Field.Root required>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="Enter your email"
            name="email"
            autoComplete="disabled"
          />
          <Field.HelperText>We'll send you a magic link to login.</Field.HelperText>
        </Field.Root>

        {fetcher.data?.error !== null && (
          <Text
            color="red.500"
            marginTop="2"
            fontSize="sm"
          >
            {fetcher.data?.error}
          </Text>
        )}
        {fetcher.data?.success == true && (
          <Text
            color="green.500"
            marginTop="2"
            fontSize="sm"
          >
            Magic link sent! Please check your email to login.
          </Text>
        )}

        <PrimaryButton
          minW="100%"
          marginTop="5"
          type="submit"
          disabled={fetcher.state !== 'idle'}
        >
          Send Link {fetcher.state !== 'idle' && <Spinner />}
        </PrimaryButton>
      </fetcher.Form>
    </Center>
  );
}
