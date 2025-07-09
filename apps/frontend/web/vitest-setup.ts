import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
// import { useBearStore } from '@cwt/state/counter'; // Adjust path if needed

// Mock window.matchMedia
// This mock is robust enough for most UI libraries that use matchMedia for color scheme, etc.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Runs after each test file
afterEach(() => {
  cleanup(); // Cleans up the DOM after each test
  // Reset Zustand store state
});
