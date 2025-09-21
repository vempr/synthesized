import { Heading, Stack, Text, Em, Flex, Card, Image } from '@chakra-ui/react';
import type { Route } from './+types/home';
import Link from '~/components/ui/link';
import PrimaryButton from '~/components/primary-button';
import { NavLink } from 'react-router';
import { BicepsFlexed, BookOpenText, CalendarDays, ChartLine } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Muscle Composition Wiki & Platform' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export default function Home() {
  return (
    <Stack>
      <Heading
        as="h1"
        fontSize="40px"
        marginBottom="2"
      >
        Synthesized{' '}
      </Heading>
      <Text>
        A platform to showcase the natural muscles of humans, their functions and how to train them! By using our{' '}
        <Em>
          <Link to="/wiki">Muscle Composition Wiki</Link>
        </Em>
        , you can inform yourself about the importance of your body's natural muscles and appropriately train them. To apply your knowledge directly,
        we also have a free{' '}
        <Em>
          <Link to="/logbook">Logbook</Link>
        </Em>
        , where you can track your progress of specific exercises.
      </Text>

      <Heading
        as="h2"
        marginTop="4"
      >
        Getting started
      </Heading>

      <Flex
        flexDirection="row"
        gap="8"
        flexWrap="wrap"
      >
        <Card.Root
          flex="1"
          minWidth="200px"
          md={{ minWidth: '400px' }}
        >
          <Card.Header color="color">
            <Heading as="h3">
              <Flex
                gap="3"
                alignItems="center"
              >
                The Logbook
                <span>
                  <CalendarDays />
                </span>
              </Flex>
            </Heading>
          </Card.Header>
          <Card.Body color="color">
            <Text>
              Track your training sessions by entering your exercises and view <b>insights</b> about each exercise in detail!
            </Text>
          </Card.Body>
          <Card.Footer>
            <PrimaryButton
              asChild
              flex="1"
            >
              <NavLink to="/logbook">
                Track and progress <ChartLine />
              </NavLink>
            </PrimaryButton>
          </Card.Footer>
        </Card.Root>

        <Card.Root
          flex="1"
          minWidth="200px"
          md={{ minWidth: '400px' }}
        >
          <Card.Header color="color">
            <Heading as="h3">
              <Flex
                gap="3"
                alignItems="center"
              >
                Muscle Composition Wiki{' '}
                <span>
                  <BookOpenText />
                </span>
              </Flex>
            </Heading>
          </Card.Header>
          <Card.Body color="color">
            <Text>
              Extensive information about each significant muscle (group), how they keep our bodies intact and what exercises you should perform for
              them. Read about <b>15</b> muscle (groups)!
            </Text>
          </Card.Body>
          <Card.Footer>
            <PrimaryButton
              asChild
              flex="1"
            >
              <NavLink to="/wiki">
                Learn more about your muscles <BicepsFlexed />
              </NavLink>
            </PrimaryButton>
          </Card.Footer>
        </Card.Root>
      </Flex>

      <Heading
        as="h2"
        marginTop="3"
      >
        Training insights example
      </Heading>
      <Image
        src="/week-3-2.jpg"
        border="1px solid"
        borderColor="border"
        borderRadius="sm"
      />
    </Stack>
  );
}
