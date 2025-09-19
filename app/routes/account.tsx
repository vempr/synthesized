import { authMiddleware } from '~/middleware/auth';
import type { Route } from './+types/account';
import { createSupabaseServerClient } from '~/services/supabase.server';
import { redirect, useLoaderData } from 'react-router';
import { userContext, type User } from '~/context';
import { Heading, List, Spinner, Text, VStack, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useFetcher } from 'react-router';
import PrimaryButton from '~/components/primary-button';
import { useEffect, useState } from 'react';
import z from 'zod';
import { toaster } from '~/components/ui/toaster';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Account Settings' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  let auth = user as User;

  return {
    email: auth.email,
    created_at: auth.created_at,
    last_sign_in_at: auth.last_sign_in_at as string,
  };
}

export async function action({ request, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  if (!user) {
    throw redirect('/login', { headers: new Headers() });
  }

  const body = await request.formData();
  let fetcher = body.get('fetcher');

  try {
    z.string().parse(fetcher);
  } catch (err) {
    console.log(err);
    return { error: 'Not a valid fetcher' };
  }

  fetcher = fetcher as string;

  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);

  switch (fetcher) {
    case 'logoutFetcher':
      const { error: logoutError } = await supabaseClient.auth.signOut();
      if (logoutError) {
        return { fetcher: 'logoutFetcher', error: logoutError.message, success: false };
      } else {
        return redirect('/login', { headers });
      }

    case 'clearDataFetcher':
      const { error: trainingSessionsError } = await supabaseClient.from('training_sessions').delete().eq('user_id', user.id);
      if (trainingSessionsError) {
        return { fetcher: 'clearDataFetcher', error: trainingSessionsError.message, success: false };
      }

      const { error: trainingSessionExercisesError } = await supabaseClient.from('training_session_exercises').delete().eq('user_id', user.id);
      if (trainingSessionExercisesError) {
        return { fetcher: 'clearDataFetcher', error: trainingSessionExercisesError.message, success: false };
      }

      const { error: exercisesError } = await supabaseClient.from('exercises').delete().eq('user_id', user.id);
      if (exercisesError) {
        return { fetcher: 'clearDataFetcher', error: exercisesError.message, success: false };
      }

      return { fetcher: 'clearDataFetcher', error: null, success: true };

    case 'deleteAccountFetcher':
      const { error: deleteAccountError } = await supabaseClient.auth.admin.deleteUser(user.id);
      if (deleteAccountError) {
        return { fetcher: 'deleteAccountFetcher', error: deleteAccountError.message, success: false };
      } else {
        return redirect('/', { headers });
      }

    default:
      return { fetcher: null, error: "fetcher doesn't exist", success: false };
  }
}

export default function Account() {
  const [clearDataDialogOpen, clearDataDialogSetOpen] = useState(false);

  const user = useLoaderData<typeof loader>();
  const created_at = new Date(user.created_at);
  const last_sign_in_at = new Date(user.last_sign_in_at);

  const logoutFetcher = useFetcher<typeof action>();
  const clearDataFetcher = useFetcher<typeof action>();
  const deleteAccountFetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (clearDataFetcher.data?.fetcher === 'clearDataFetcher' && clearDataFetcher.data?.success) {
      clearDataDialogSetOpen(false);
      toaster.create({
        description: 'Data cleared successfully',
        type: 'success',
      });
    }
  }, [clearDataFetcher.data]);

  return (
    <VStack
      align="start"
      gapY={3}
    >
      <Heading
        size="2xl"
        as="h1"
      >
        {user.email}
      </Heading>

      <Text>
        You're in the account settings. Our only method of authentication is <b>passwordless</b>, so you don't have to worry about changing passwords.
        Just keep your email safe!
      </Text>

      <List.Root ml={4}>
        <List.Item>
          Account created {created_at.toLocaleDateString('en-US')}, at {created_at.toLocaleTimeString('de-DE')}
        </List.Item>
        <List.Item>
          Last login occured {last_sign_in_at.toLocaleDateString('en-US')}, at {last_sign_in_at.toLocaleTimeString('de-DE')}
        </List.Item>
      </List.Root>

      <Heading
        size="2xl"
        as="h1"
      >
        Log out of your account
      </Heading>

      <logoutFetcher.Form
        method="delete"
        className="w-72"
      >
        <input
          type="hidden"
          name="fetcher"
          value="logoutFetcher"
        />

        {logoutFetcher.data?.fetcher === 'logoutFetcher' && logoutFetcher.data?.error !== null && (
          <Text
            color="red.500"
            marginBottom="2"
            fontSize="sm"
          >
            {logoutFetcher.data?.error}
          </Text>
        )}

        <PrimaryButton
          type="submit"
          disabled={logoutFetcher.state !== 'idle'}
        >
          Logout {logoutFetcher.state !== 'idle' && <Spinner />}
        </PrimaryButton>
      </logoutFetcher.Form>

      <Heading
        size="2xl"
        as="h1"
      >
        Danger zone
      </Heading>

      <Dialog.Root
        size="full"
        motionPreset="slide-in-bottom"
        open={clearDataDialogOpen}
        onOpenChange={(e) => clearDataDialogSetOpen(e.open)}
      >
        <Dialog.Trigger asChild>
          <PrimaryButton>Clear data</PrimaryButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              color="color"
              bg="bg"
            >
              <Dialog.Header>
                <Dialog.Title>Are you sure you want to clear all app data?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>This will remove all your logbook entries. Your account and linked email will remain intact.</p>

                {clearDataFetcher.data?.fetcher === 'clearDataFetcher' && clearDataFetcher.data?.error !== null && (
                  <Text
                    color="red.500"
                    marginBottom="2"
                    fontSize="sm"
                  >
                    {clearDataFetcher.data?.error}
                  </Text>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <PrimaryButton>Cancel</PrimaryButton>
                </Dialog.ActionTrigger>
                <clearDataFetcher.Form method="delete">
                  <input
                    type="hidden"
                    name="fetcher"
                    value="clearDataFetcher"
                  />

                  <Button
                    type="submit"
                    disabled={clearDataFetcher.state !== 'idle'}
                  >
                    Clear data {clearDataFetcher.state !== 'idle' && <Spinner />}
                  </Button>
                </clearDataFetcher.Form>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Dialog.Root
        size="full"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <PrimaryButton>Delete account</PrimaryButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              color="color"
              bg="bg"
            >
              <Dialog.Header>
                <Dialog.Title>Delete your account permanently?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>This action cannot be undone. Your account and all associated content will be permanently erased.</p>

                {deleteAccountFetcher.data?.fetcher === 'deleteAccountFetcher' && deleteAccountFetcher.data?.error !== null && (
                  <Text
                    color="red.500"
                    marginBottom="2"
                    fontSize="sm"
                  >
                    {deleteAccountFetcher.data?.error}
                  </Text>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <PrimaryButton>Cancel</PrimaryButton>
                </Dialog.ActionTrigger>
                <deleteAccountFetcher.Form method="delete">
                  <input
                    type="hidden"
                    name="fetcher"
                    value="deleteAccountFetcher"
                  />

                  <Button
                    type="submit"
                    disabled={deleteAccountFetcher.state !== 'idle'}
                  >
                    Delete account {deleteAccountFetcher.state !== 'idle' && <Spinner />}
                  </Button>
                </deleteAccountFetcher.Form>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
}
