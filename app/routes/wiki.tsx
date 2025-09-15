import { Em, Heading, Text, List, VStack, Image, Card, Wrap, Flex } from '@chakra-ui/react';
import type { Route } from './+types/home';
import PrimaryButton from '~/components/primary-button';
import { NavLink } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Muscle Composition Wiki' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

export default function Wiki() {
  return (
    <VStack
      align="start"
      gapY={3}
    >
      <Heading
        size="2xl"
        as="h1"
      >
        Muscle Composition Wiki
      </Heading>

      <Text>
        Welcome to the <Em>Muscle Composition Wiki</Em>, your interactive guide to understanding the human body. Here, you can explore a gallery of
        muscle groups in detail, learning about:
      </Text>

      <List.Root ml={4}>
        <List.Item>their anatomy</List.Item>
        <List.Item>primary functions</List.Item>
        <List.Item>and how they contribute to everyday movement and athletic performance.</List.Item>
      </List.Root>

      <Text>
        In addition to anatomy, you&apos;ll find practical training insights, including exercises and techniques proven to target specific muscles
        effectively. This makes it easy to not only understand how muscles function but also how to strengthen and maintain them safely.
      </Text>

      <Heading
        size="2xl"
        as="h2"
        marginTop={2}
      >
        Views
      </Heading>

      <Wrap gap={4}>
        <Card.Root
          flex="1"
          minWidth="200px"
          md={{ minWidth: '400px' }}
        >
          <Card.Header color="color">
            <Heading as="h3">Muscles visible from the back:</Heading>

            <List.Root ml={4}>
              <List.Item>Deltoids</List.Item>
              <List.Item>Lower, mid and upper back</List.Item>
              <List.Item>Triceps</List.Item>
              <List.Item>Forearms</List.Item>
            </List.Root>
          </Card.Header>
          <Card.Body>
            <Image
              height="200px"
              md={{ height: '400px' }}
              src="/back_empty.PNG"
            />
          </Card.Body>
          <Card.Footer>
            <PrimaryButton
              asChild
              flex="1"
            >
              <NavLink to="/wiki/back">View muscle groups from "back" view</NavLink>
            </PrimaryButton>
          </Card.Footer>
        </Card.Root>

        <Card.Root
          flex="1"
          minWidth="200px"
          md={{ minWidth: '400px' }}
        >
          <Card.Header color="color">
            <Heading as="h3">Muscles visible from the front:</Heading>

            <Flex gapX={10}>
              <List.Root ml={3}>
                <List.Item>Neck</List.Item>
                <List.Item>Biceps</List.Item>
                <List.Item>Chest</List.Item>
                <List.Item>Midsection</List.Item>
              </List.Root>

              <List.Root>
                <List.Item>Glutes</List.Item>
                <List.Item>Quadriceps</List.Item>
                <List.Item>Hamstrings</List.Item>
                <List.Item>Calves</List.Item>
              </List.Root>

              <List.Root>
                <List.Item>Tibialis</List.Item>
              </List.Root>
            </Flex>
          </Card.Header>
          <Card.Body>
            <Image
              height="200px"
              md={{ height: '400px' }}
              src="/front_empty.PNG"
            />
          </Card.Body>
          <Card.Footer>
            <PrimaryButton
              asChild
              flex="1"
            >
              <NavLink to="/wiki/front">View muscle groups from "front" view</NavLink>
            </PrimaryButton>
          </Card.Footer>
        </Card.Root>
      </Wrap>
    </VStack>
  );
}
