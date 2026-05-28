/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // Drop console.log, console.warn, console.info, console.debug
        // but NOT console.error
        pure_funcs: [
          'console.log',
          'console.info',
          'console.debug',
          'console.warn',
        ],
        conditionals: true, // optimizes if/ternary statements
        evaluate: true, // evaluates constant expressions at compile time
      },
      format: {
        comments: 'some', // keeps comments containing @license, @preserve, or !
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
});
