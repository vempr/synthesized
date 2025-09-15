import { Box, Flex, Heading } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { Outlet } from 'react-router';
import Link from '~/components/ui/link';

export default function WikiLayout() {
  return (
    <Box>
      <Link to="/wiki">
        <Flex
          alignItems="center"
          gapX={2}
        >
          <ArrowLeft />
          <Heading
            size="2xl"
            as="h1"
          >
            Muscle Composition Wiki
          </Heading>
        </Flex>
      </Link>

      <Outlet />
    </Box>
  );
}
