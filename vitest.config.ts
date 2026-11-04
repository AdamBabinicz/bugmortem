import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    // Mirror the @/* alias from tsconfig.json
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Pure Node environment — no browser/DOM needed for engine tests
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
    globals: true,
    reporters: ['verbose'],
    sequence: {
      // Fixed seed for reproducible CI runs (Kiroween 2026-10-31)
      seed: 20261031,
    },
  },
});
