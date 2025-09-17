import { Box, CloseButton, Flex, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router';
import PrimaryButton from '~/components/primary-button';
import { ColorModeButton } from '~/components/ui/color-mode';
import Link from '~/components/ui/link';
import { Drawer } from '@chakra-ui/react';
import Hr from '~/components/hr';

export default function AppLayout() {
  const [mobileNavBarToggled, setMobileNavBarToggled] = useState(false);

  const mobileToggleButton = (
    <div>
      <button
        className="relative group"
        onClick={() => setMobileNavBarToggled(!mobileNavBarToggled)}
      >
        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] ring-2 ring-gray-500 bg-gray-600 ring-opacity-20 shadow-md">
          <div className="flex flex-col justify-between w-[20px] h-[20px] origin-center overflow-hidden">
            <div className="bg-white h-[2px] w-5"></div>
            <div className="bg-white h-[2px] w-5"></div>
            <div className="bg-white h-[2px] w-5"></div>
          </div>
        </div>
      </button>
    </div>
  );

  return (
    <div>
      <Box
        display="none"
        md={{ display: 'block' }}
      >
        <nav className="py-4 px-7">
          <Flex
            gap="4"
            align="center"
            justify="space-between"
          >
            <Flex gap="7">
              <Link to="/">Home</Link>
              <Link to="/wiki">Composition Wiki</Link>
              <Link to="/wiki">Your Account</Link>
            </Flex>

            <Flex gap="2">
              <ColorModeButton />
              <PrimaryButton asChild>
                <NavLink to="/logbook">Personal Logbook</NavLink>
              </PrimaryButton>
            </Flex>
          </Flex>
        </nav>
      </Box>

      <Box
        display="block"
        md={{ display: 'none' }}
      >
        <nav className="p-4">
          <Flex
            align="center"
            justify="space-between"
          >
            {mobileToggleButton}

            <Drawer.Root
              open={mobileNavBarToggled}
              onOpenChange={(e) => setMobileNavBarToggled(e.open)}
              size="xl"
            >
              <Drawer.Trigger />
              <Portal>
                <Drawer.Backdrop bg="bg" />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.CloseTrigger
                        asChild
                        pos="initial"
                      >
                        <CloseButton color="color" />
                      </Drawer.CloseTrigger>
                      <Drawer.Title color="color">Links</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <Flex
                        gap="5"
                        direction="column"
                      >
                        <Link to="/">Home</Link>
                        <Link to="/wiki">Composition Wiki</Link>
                        <Link to="/lb">Logbook</Link>
                        <Link to="/account">Your Account</Link>
                      </Flex>
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>

            <Flex gap="2">
              <ColorModeButton />
              <PrimaryButton asChild>
                <NavLink to="/logbook">Personal Logbook</NavLink>
              </PrimaryButton>
            </Flex>
          </Flex>
        </nav>
      </Box>

      <Hr />

      <main className="p-7">
        <Outlet />
      </main>
    </div>
  );
}
