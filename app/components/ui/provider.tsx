'use client';

import { ChakraProvider, createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        dBackground: { value: '#030712' },
        lBackground: { value: '#ffffff' },
        dTextColor: { value: '#ffffff' },
        lTextColor: { value: '#030712' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.lBackground}', _dark: '{colors.dBackground}' },
        },
        color: {
          value: { base: '{colors.lTextColor}', _dark: '{colors.dTextColor}' },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
