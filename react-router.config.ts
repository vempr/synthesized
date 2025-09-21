import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

export default {
  ssr: true,
  presets: [vercelPreset()],
  future: {
    v8_middleware: true,
  },
} satisfies Config;
