// import { authMiddleware } from '~/middleware/auth';
import type { Route } from './+types/logbook';
import { Box, Button, Card, CloseButton, Dialog, Em, Field, Flex, Heading, Input, List, Portal, Spinner, Tabs, Text, VStack } from '@chakra-ui/react';
import PrimaryButton from '~/components/primary-button';
import { useEffect, useMemo, useState } from 'react';
import { Form, redirect, useActionData, useLoaderData, useNavigation } from 'react-router';
import { createSupabaseServerClient } from '~/services/supabase.server';
import z from 'zod';
// import { userContext, type User } from '~/context';
import { NavLink } from 'react-router';
import { ChartScatter, CirclePlus, Dumbbell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toaster } from '~/components/ui/toaster';

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

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

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw redirect('/login', { headers: new Headers() });
  }

  const { data, error } = await supabaseClient.from('training_sessions').select(
    `
		*,
		training_session_exercises (
			*,
			exercises:exercises(*)
		)
	`,
  );
  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function action({ request, context }: Route.ActionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw redirect('/login', { headers: new Headers() });
  }

  const body = await request.formData();
  let date = body.get('date');

  try {
    z.iso.date().parse(date);
  } catch (err) {
    console.log(err);
    return { error: 'Not a valid date' };
  }

  date = date as string;

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
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [newLogDialogOpen, newLogDialogSetOpen] = useState(false);

  const currentDate = useMemo(() => new Date(), []);
  const sessions = useMemo(() => {
    return loaderData.data?.slice().sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }, [loaderData.data]);
  const exercisesForInsights = useMemo(() => {
    if (!loaderData.data) return [];

    const flat = loaderData.data.flatMap((session) =>
      session.training_session_exercises.map((ex) => ({
        name: ex.exercises.name,
        date: session.date,
        reps: ex.reps,
        sets: ex.sets,
        weight: ex.break_time,
      })),
    );

    const grouped: Record<string, typeof flat> = {};
    flat.forEach((item) => {
      if (!grouped[item.name]) {
        grouped[item.name] = [];
      }
      grouped[item.name].push(item);
    });

    return Object.entries(grouped).map(([exerciseName, entries]) => entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  }, [loaderData.data]);

  useEffect(() => {
    if (actionData?.error) {
      toaster.create({
        description: actionData.error,
        type: 'error',
      });
    }
  }, [actionData]);

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
          <PrimaryButton type="button">
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

                  <PrimaryButton
                    type="submit"
                    disabled={navigation.state !== 'idle'}
                    marginTop="7"
                  >
                    Create {navigation.state !== 'idle' && <Spinner />}
                  </PrimaryButton>
                </Form>
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Text opacity="80%">
        Tip: If you perform bodyweight exercises, please put your actual body weight to see progress in strength from a relative and absolute
        standpoint. Another tip: Graphs are not responsive. Sorry
      </Text>

      <Tabs.Root
        defaultValue="sessions"
        variant="line"
      >
        <Tabs.List>
          <Tabs.Trigger
            _selected={{ color: 'color' }}
            value="sessions"
            color="border"
          >
            <Dumbbell />
            Sessions
          </Tabs.Trigger>
          <Tabs.Trigger
            _selected={{ color: 'color' }}
            value="insights"
            color="border"
          >
            <ChartScatter />
            Insights
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="sessions">
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            gap="4"
            flexWrap="wrap"
          >
            {sessions?.map((session) => (
              <NavLink
                to={`/logbook/${session.id}`}
                className="hover:shadow-xl w-full md:w-fit"
                key={session.id}
              >
                <Card.Root
                  size="sm"
                  w={{ base: '100%', md: '60' }}
                  h={{ base: '30', md: '200px' }}
                  borderColor="border"
                  bg="muted"
                  color="color"
                >
                  <Card.Header>
                    <Heading size="md">{new Date(session.date).toLocaleDateString('en-US')}</Heading>
                  </Card.Header>
                  <Card.Body>
                    {session.training_session_exercises.length ? (
                      <List.Root ml={4}>
                        {session.training_session_exercises.slice(0, 3).map((exercise) => (
                          <List.Item key={exercise.id}>
                            {exercise.exercises.name} ({exercise.sets}S/{exercise.reps}R/{exercise.break_time})
                          </List.Item>
                        ))}
                        {session.training_session_exercises.length > 3 && <Text>...</Text>}
                      </List.Root>
                    ) : (
                      <Text>No exercises</Text>
                    )}
                  </Card.Body>
                </Card.Root>
              </NavLink>
            ))}
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="insights">
          <Flex
            flexDirection="row"
            gap="8"
            flexWrap="wrap"
          >
            {exercisesForInsights.map((exerciseData, idx) => (
              <VStack marginBottom="6">
                <Heading as="h2">{exerciseData[0]?.name}</Heading>

                <AreaChart
                  key={idx}
                  width={730}
                  height={600}
                  data={exerciseData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`colorReps-${idx}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#8884d8"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#8884d8"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id={`colorSets-${idx}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#82ca9d"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#82ca9d"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id={`colorWeight-${idx}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#ffc658"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#ffc658"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="reps"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill={`url(#colorReps-${idx})`}
                  />
                  <Area
                    type="monotone"
                    dataKey="sets"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill={`url(#colorSets-${idx})`}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#ffc658"
                    fillOpacity={0.4}
                    fill={`url(#colorWeight-${idx})`}
                  />
                </AreaChart>
              </VStack>
            ))}
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
}
