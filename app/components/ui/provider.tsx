import { ChakraProvider, createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import type { MdOutlineEditNote } from 'react-icons/md';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        dBackground: { value: '#0c0c0c' },
        lBackground: { value: '#f2f3f4' },
        dTextColor: { value: '#ffffff' },
        lTextColor: { value: '#030712' },
        dMuted: { value: '#111111' },
        lMuted: { value: '#ffffff' },
        dBorder: { value: 'rgba(255,255,255,0.1)' },
        lBorder: { value: 'rgba(0,0,0,0.2)' },
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
        muted: {
          value: { base: '{colors.lMuted}', _dark: '{colors.dMuted}' },
        },
        border: {
          value: { base: '{colors.lBorder}', _dark: '{colors.dBorder}' },
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
