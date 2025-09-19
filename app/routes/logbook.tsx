import { authMiddleware } from '~/middleware/auth';
import type { Route } from './+types/logbook';
import { Button, Card, CloseButton, Dialog, Field, Flex, Heading, Input, Portal, VStack } from '@chakra-ui/react';
import PrimaryButton from '~/components/primary-button';
import { useMemo, useState } from 'react';
import { Form, redirect, useLoaderData } from 'react-router';
import { createSupabaseServerClient } from '~/services/supabase.server';
import z from 'zod';
import { userContext, type User } from '~/context';
import { NavLink } from 'react-router';
import { CirclePlus } from 'lucide-react';

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Your Personal Logbook' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);

  const { data, error } = await supabaseClient.from('training_sessions').select();
  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function action({ request, context }: Route.ActionArgs) {
  const user = context.get(userContext) as User;
  const body = await request.formData();
  let date = body.get('date');

  try {
    z.iso.date().parse(date);
  } catch (err) {
    console.log(err);
    return { error: 'Not a valid date' };
  }

  date = date as string;

  const { supabaseClient } = createSupabaseServerClient(request, request.headers);

  const { data, error } = await supabaseClient
    .from('training_sessions')
    .insert({
      user_id: user.id,
      date: date,
    })
    .select();

  if (error) {
    return { error: 'database error: ' + error.message };
  } else {
    return redirect(`/logbook/${data[0].id}`);
  }
}

export default function Logbook() {
  const loaderData = useLoaderData<typeof loader>();
  const [newLogDialogOpen, newLogDialogSetOpen] = useState(false);
  const currentDate = useMemo(() => new Date(), []);

  return (
    <VStack
      align="start"
      gapY={3}
    >
      <Heading
        size="2xl"
        as="h1"
      >
        Logbook: {currentDate.toLocaleDateString('en-US')} | {loaderData.data?.length} training logs
      </Heading>

      <Dialog.Root
        size="full"
        motionPreset="slide-in-bottom"
        open={newLogDialogOpen}
        onOpenChange={(e) => newLogDialogSetOpen(e.open)}
      >
        <Dialog.Trigger asChild>
          <PrimaryButton>
            <CirclePlus /> Create new training log
          </PrimaryButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              color="color"
              bg="bg"
            >
              <Dialog.Header>
                <Dialog.Title>New training log</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Form method="post">
                  <Field.Root required>
                    <Field.Label>
                      Date <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="Enter your date"
                      name="date"
                      autoComplete="disabled"
                      type="date"
                      defaultValue={formatDateForInput(currentDate)}
                    />
                    <Field.HelperText>The date of your training session.</Field.HelperText>
                  </Field.Root>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button>Cancel</Button>
                    </Dialog.ActionTrigger>

                    <PrimaryButton type="submit">Create</PrimaryButton>
                  </Dialog.Footer>
                </Form>
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {loaderData.data?.map((session) => (
        <NavLink
          to={`/logbook/${session.id}`}
          className="hover:shadow-xl w-full md:w-fit"
          key={session.id}
        >
          <Card.Root
            size="sm"
            w={{ base: '100%', md: '60' }}
            h={{ base: '30', md: '40' }}
            borderColor="border"
            bg="muted"
            color="color"
          >
            <Card.Header>
              <Heading size="md">{new Date(session.date).toLocaleDateString('en-US')}</Heading>
            </Card.Header>
            <Card.Body>No exercises</Card.Body>
          </Card.Root>
        </NavLink>
      ))}
    </VStack>
  );
}
