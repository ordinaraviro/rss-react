/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: ['**/node_modules/**', '**/*.test.tsx','**/*main.tsx', '**/*.spec.tsx', 'src/__tests__/setup.ts'],
    },
  },
});
