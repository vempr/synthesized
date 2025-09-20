import { createSupabaseServerClient } from '~/services/supabase.server';
import type { Route } from './+types/logbook-session';
import { userContext, type User } from '~/context';
import { redirect, useFetcher, useLoaderData } from 'react-router';
import { authMiddleware } from '~/middleware/auth';
import { Box, Button, CloseButton, Dialog, Field, Flex, Heading, Input, Mark, Portal, Spinner, Stack, Table, Text, VStack } from '@chakra-ui/react';
import Link from '~/components/ui/link';
import { ArrowLeft, CirclePlus, SquarePen, Trash } from 'lucide-react';
import PrimaryButton from '~/components/primary-button';
import { useEffect, useState } from 'react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import z from 'zod';
import { toaster } from '~/components/ui/toaster';
import { type EditAction } from './logbook-session-edit';
import type { DeleteAction } from './logbook-session-delete';

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

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext) as User;
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);
  const sessionId = params.sessionId;

  const { data, error } = await supabaseClient
    .from('training_sessions')
    .select(
      `
    *,
    training_session_exercises (
      *,
      exercises:exercises(*)
    )
  `,
    )
    .eq('id', sessionId)
    .single();

  const { data: exercisesData, error: exercisesError } = await supabaseClient.from('exercises').select().eq('user_id', user.id);

  if (error || exercisesError) {
    if (user) {
      throw redirect('/logbook');
    } else {
      throw redirect('/');
    }
  }

  return {
    ...data,
    exercisesData,
  };
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);

  const { data } = await supabaseClient.from('training_sessions').select().eq('id', params.sessionId).single();

  if (!data) {
    return null;
  }

  const user = context.get(userContext) as User;
  const form = await request.formData();

  if (form.get('delete_self')) {
    const { error } = await supabaseClient.from('training_sessions').delete().eq('id', params.sessionId).single();

    if (error) {
      return null;
    } else {
      return redirect('/logbook');
    }
  }

  let numberOfExercises: string | number = String(form.get('numberOfExercises'));
  numberOfExercises = parseInt(numberOfExercises);
  if (numberOfExercises > 100) {
    numberOfExercises = 100;
  }

  const exercises: {
    name: string;
    sets: number;
    reps: number;
    breakTime: number;
  }[] = new Array();

  for (let i = 0; i < numberOfExercises; i++) {
    const name = String(form.get(`exercise-${i}-name`));
    const sets = String(form.get(`exercise-${i}-sets`));
    const reps = String(form.get(`exercise-${i}-reps`));
    const breakTime = String(form.get(`exercise-${i}-break_time`));

    if (name) {
      try {
        z.string().min(1).max(255).parse(name);
        z.number().min(1).max(10000).nullable().parse(parseInt(sets));
        z.number().min(1).max(10000).nullable().parse(parseInt(reps));
        z.number().min(1).max(10000).nullable().parse(parseInt(breakTime));
      } catch (err) {
        console.log(err);
        return { error: 'Invalid form inputs: Sets, repetitions and weight must have a minimum value of 1.' };
      }

      exercises.push({
        name,
        sets: parseInt(sets),
        reps: parseInt(reps),
        breakTime: parseInt(breakTime),
      });
    }
  }

  if (exercises.length === 0) {
    return null;
  }

  const { data: insertedExercises, error: insertError } = await supabaseClient
    .from('exercises')
    .upsert(
      exercises.map((ex) => ({
        name: ex.name,
        user_id: user.id,
      })),
      {
        onConflict: 'name,user_id',
      },
    )
    .select();

  if (insertError) {
    console.error('Error inserting exercises:', insertError);
    throw insertError;
  }

  const exerciseMap = new Map<string, number>();
  insertedExercises?.forEach((ex) => {
    exerciseMap.set(ex.name, ex.id);
  });

  const trainingSessionInserts = exercises.map((ex) => ({
    exercise_id: exerciseMap.get(ex.name)!,
    training_session_id: params.sessionId,
    user_id: user.id,
    sets: ex.sets,
    reps: ex.reps,
    break_time: ex.breakTime,
  }));

  const { data: sessionData, error: sessionError } = await supabaseClient.from('training_session_exercises').insert(trainingSessionInserts).select();

  if (sessionError) {
    console.error('Error inserting training session exercises:', sessionError);
    return { error: sessionError };
  }

  return { data: sessionData, success: true };

  /**
	 * FormData {
			'exercise-0-name': 'Push ups',
			'exercise-0-sets': '12',
			'exercise-0-reps': '15',
			'exercise-0-break_time': '100',
			'exercise-1-name': 'exercises2',
			'exercise-1-sets': '',
			'exercise-1-reps': '123',
			'exercise-1-break_time': '',
			'exercise-2-name': '',
			'exercise-2-sets': '',
			'exercise-2-reps': '213',
			'exercise-2-break_time': '',
			'exercise-3-name': '',
			'exercise-3-sets': '21421',
			'exercise-3-reps': '',
			'exercise-3-break_time': '',
			numberOfExercises: '4'
		}
	*/
}

export default function LogbookSession() {
  const data = useLoaderData<typeof loader>();
  const [newExerciseDialogOpen, newExerciseDialogSetOpen] = useState(false);
  const [openExerciseId, setOpenExerciseId] = useState<number | null>(null);
  const [numberOfExerciseForms, setNumberOfExerciseForms] = useState(3);

  const addExercisesFetcher = useFetcher<typeof action>();
  const editExerciseFetcher = useFetcher<EditAction>();
  const deleteExerciseFetcher = useFetcher<DeleteAction>();
  const deleteSessionFetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (addExercisesFetcher.data?.success) {
      newExerciseDialogSetOpen(false);
      toaster.create({
        description: 'Exercises added successfully',
        type: 'success',
      });
    }

    if (addExercisesFetcher.data?.error) {
      toaster.create({
        description: addExercisesFetcher.data.error,
        type: 'error',
      });
    }
  }, [addExercisesFetcher.data]);

  useEffect(() => {
    if (editExerciseFetcher.data?.success) {
      setOpenExerciseId(null);
      toaster.create({
        description: 'Exercise edited successfully',
        type: 'success',
      });
    }

    if (editExerciseFetcher.data?.error) {
      toaster.create({
        description: editExerciseFetcher.data.error,
        type: 'error',
      });
    }
  }, [editExerciseFetcher.data]);

  useEffect(() => {
    if (deleteExerciseFetcher.data?.success) {
      setOpenExerciseId(null);
      toaster.create({
        description: 'Exercise deleted successfully',
        type: 'success',
      });
    }

    if (deleteExerciseFetcher.data?.error) {
      toaster.create({
        description: deleteExerciseFetcher.data.error,
        type: 'error',
      });
    }
  }, [deleteExerciseFetcher.data]);

  return (
    <VStack gapY={3}>
      <Box w="100%">
        <Link to="/logbook">
          <Flex
            alignItems="center"
            gapX={2}
          >
            <ArrowLeft />
            <Heading
              size="lg"
              as="h1"
            >
              Logbook
            </Heading>
          </Flex>
        </Link>
      </Box>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          gap="4"
        >
          <Heading
            size="2xl"
            as="h1"
            marginTop="-3"
          >
            Training log: {new Date(data.date).toLocaleDateString('en-US')}
          </Heading>

          <Dialog.Root
            size="full"
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger paddingBottom="3">
              <Button>
                <Trash /> Delete training session
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content
                  color="color"
                  bg="bg"
                >
                  <Dialog.Header>
                    <Dialog.Title>Delete session permanently?</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>This action cannot be undone. Your session and all associated exercises will be permanently erased.</p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <PrimaryButton>Cancel</PrimaryButton>
                    </Dialog.ActionTrigger>
                    <deleteSessionFetcher.Form method="post">
                      <input
                        type="hidden"
                        name="delete_self"
                        value="true"
                      />

                      <Button
                        type="submit"
                        disabled={deleteSessionFetcher.state !== 'idle'}
                      >
                        Delete session {deleteSessionFetcher.state !== 'idle' && <Spinner />}
                      </Button>
                    </deleteSessionFetcher.Form>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Flex>

        <Dialog.Root
          size="full"
          motionPreset="slide-in-bottom"
          open={newExerciseDialogOpen}
          onOpenChange={(e) => newExerciseDialogSetOpen(e.open)}
        >
          <Dialog.Trigger asChild>
            <PrimaryButton>
              <CirclePlus /> Add exercises to session
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
                  <Dialog.Title>Add exercises</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <addExercisesFetcher.Form method="post">
                    {Array.from({ length: numberOfExerciseForms }).map((_, eid) => (
                      <Stack
                        marginBottom="4"
                        key={`exercise-${eid}`}
                      >
                        <Heading
                          size="2xl"
                          as="h1"
                          marginBottom="1"
                          opacity="90%"
                          textDecoration="underline"
                        >
                          Exercise {eid + 1}
                          {eid === 0 && '*'}
                        </Heading>

                        <Stack direction={{ base: 'column', md: 'row' }}>
                          <Field.Root required={eid === 0 ? true : false}>
                            <Field.Label>Name</Field.Label>
                            <AutoComplete
                              openOnFocus
                              freeSolo
                            >
                              <AutoCompleteInput
                                name={`exercise-${eid}-name`}
                                maxLength={255}
                              />
                              <AutoCompleteList color="color">
                                {data.exercisesData.map((exercise) => (
                                  <AutoCompleteItem
                                    key={exercise.id}
                                    value={exercise.name}
                                    textTransform="capitalize"
                                  >
                                    {exercise.name}
                                  </AutoCompleteItem>
                                ))}
                              </AutoCompleteList>
                            </AutoComplete>
                            <Field.HelperText>The name is needed if you want to fill out other fields.</Field.HelperText>
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>Sets</Field.Label>
                            <Input
                              name={`exercise-${eid}-sets`}
                              autoComplete="disabled"
                              type="number"
                              max="10000"
                            />
                            <Field.HelperText>Total number of sets for exercise {eid + 1}.</Field.HelperText>
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>Repetitions</Field.Label>
                            <Input
                              name={`exercise-${eid}-reps`}
                              autoComplete="disabled"
                              type="number"
                              max="10000"
                            />
                            <Field.HelperText>Number of reps for each set of exercise {eid + 1}.</Field.HelperText>
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>Weight</Field.Label>
                            <Input
                              name={`exercise-${eid}-break_time`}
                              autoComplete="disabled"
                              type="number"
                              max="10000"
                            />
                            <Field.HelperText>Weight for each repetition of exercise {eid + 1} in seconds.</Field.HelperText>
                          </Field.Root>
                        </Stack>
                      </Stack>
                    ))}

                    <input
                      type="hidden"
                      name="numberOfExercises"
                      value={numberOfExerciseForms}
                    />

                    {numberOfExerciseForms < 100 && (
                      <Button
                        onClick={() => {
                          setNumberOfExerciseForms(numberOfExerciseForms + 1);
                        }}
                      >
                        <CirclePlus /> More exercises
                      </Button>
                    )}

                    <Dialog.Footer marginTop="6">
                      <Dialog.ActionTrigger asChild>
                        <Button>Cancel</Button>
                      </Dialog.ActionTrigger>

                      <PrimaryButton
                        type="submit"
                        disabled={addExercisesFetcher.state !== 'idle'}
                      >
                        Create {addExercisesFetcher.state !== 'idle' && <Spinner />}
                      </PrimaryButton>
                    </Dialog.Footer>
                  </addExercisesFetcher.Form>
                </Dialog.Body>

                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Flex>

      {data.training_session_exercises.length === 0 ? (
        <Text>No exercises.</Text>
      ) : (
        <Table.Root
          variant="outline"
          maxWidth="1000px"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="color">Exercise</Table.ColumnHeader>
              <Table.ColumnHeader color="color">Sets</Table.ColumnHeader>
              <Table.ColumnHeader color="color">Reps</Table.ColumnHeader>
              <Table.ColumnHeader
                color="color"
                textAlign="end"
              >
                Weight
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.training_session_exercises.map((exercise) => (
              <Table.Row
                key={exercise.id}
                borderColor="rgba(0,0,0,0)"
              >
                <Table.Cell>
                  <Dialog.Root
                    size="full"
                    motionPreset="slide-in-bottom"
                    open={openExerciseId === exercise.id}
                    onOpenChange={(e) => setOpenExerciseId(e.open ? exercise.id : null)}
                  >
                    <Dialog.Trigger asChild>
                      <Button
                        padding="0"
                        marginRight="2"
                      >
                        <SquarePen className="w-6 h-6" />
                      </Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content
                          color="color"
                          bg="bg"
                        >
                          <Dialog.Header>
                            <Dialog.Title>
                              Edit exercise{' '}
                              <deleteExerciseFetcher.Form
                                method="post"
                                action="/logbook/delete"
                              >
                                <input
                                  type="hidden"
                                  name="session-exercise-id"
                                  value={exercise.id}
                                />

                                <PrimaryButton
                                  marginTop="1"
                                  disabled={deleteExerciseFetcher.state !== 'idle'}
                                  type="submit"
                                >
                                  <Trash /> Delete exercise from session {deleteExerciseFetcher.state !== 'idle' && <Spinner />}
                                </PrimaryButton>
                              </deleteExerciseFetcher.Form>
                            </Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body>
                            <editExerciseFetcher.Form
                              method="post"
                              action="/logbook/edit"
                            >
                              <Stack direction={{ base: 'column', md: 'row' }}>
                                <Field.Root required>
                                  <Field.Label>Name</Field.Label>
                                  <AutoComplete
                                    openOnFocus
                                    freeSolo
                                    defaultValue={exercise.exercises.name}
                                  >
                                    <AutoCompleteInput
                                      name={`exercise-name`}
                                      maxLength={255}
                                    />
                                    <AutoCompleteList color="color">
                                      {data.exercisesData.map((exercise) => (
                                        <AutoCompleteItem
                                          key={exercise.id}
                                          value={exercise.name}
                                          textTransform="capitalize"
                                        >
                                          {exercise.name}
                                        </AutoCompleteItem>
                                      ))}
                                    </AutoCompleteList>
                                  </AutoComplete>
                                  <Field.HelperText>The name is needed if you want to fill out other fields.</Field.HelperText>
                                </Field.Root>

                                <Field.Root>
                                  <Field.Label>Sets</Field.Label>
                                  <Input
                                    name={`exercise-sets`}
                                    autoComplete="disabled"
                                    type="number"
                                    max="10000"
                                    defaultValue={exercise.sets ?? ''}
                                  />
                                  <Field.HelperText>Total number of sets for exercise.</Field.HelperText>
                                </Field.Root>

                                <Field.Root>
                                  <Field.Label>Repetitions</Field.Label>
                                  <Input
                                    name={`exercise-reps`}
                                    autoComplete="disabled"
                                    type="number"
                                    max="10000"
                                    defaultValue={exercise.reps ?? ''}
                                  />
                                  <Field.HelperText>Number of reps for each set of exercise.</Field.HelperText>
                                </Field.Root>

                                <Field.Root>
                                  <Field.Label>Weight</Field.Label>
                                  <Input
                                    name={`exercise-break_time`}
                                    autoComplete="disabled"
                                    type="number"
                                    max="10000"
                                    defaultValue={exercise.break_time ?? ''}
                                  />
                                  <Field.HelperText>Weight for each repetition of exercise.</Field.HelperText>
                                </Field.Root>
                              </Stack>

                              <input
                                type="hidden"
                                name="session-exercise-id"
                                value={exercise.id}
                              />

                              <Dialog.Footer marginTop="6">
                                <Dialog.ActionTrigger asChild>
                                  <Button>Cancel</Button>
                                </Dialog.ActionTrigger>

                                <PrimaryButton
                                  type="submit"
                                  disabled={editExerciseFetcher.state !== 'idle'}
                                >
                                  Save changes {editExerciseFetcher.state !== 'idle' && <Spinner />}
                                </PrimaryButton>
                              </Dialog.Footer>
                            </editExerciseFetcher.Form>
                          </Dialog.Body>

                          <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                          </Dialog.CloseTrigger>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                  {exercise.exercises.name}
                </Table.Cell>
                <Table.Cell>{exercise.sets ?? '-'}</Table.Cell>
                <Table.Cell>{exercise.reps ?? '-'}</Table.Cell>
                <Table.Cell textAlign="end">{exercise.break_time ?? '-'}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </VStack>
  );
}
