import { ChakraProvider, createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        dBackground: { value: '#0c0c0c' },
        lBackground: { value: '#f2f3f4' },
        dTextColor: { value: '#ffffff' },
        lTextColor: { value: '#030712' },
        // dbuttonColor: { value: '#d84f2a' },
        // lbuttonColor: { value: '#f9744b' },
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
