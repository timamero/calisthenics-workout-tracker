import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
// import { Index } from '../views/Index';

function sum(a: number, b: number): number {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

function Test() {
  return (
    <div>
      <p>Welcome Home!</p>
    </div>
  );
}

describe('Testing index view', () => {
  test('renders "Welcome Home!"', () => {
    render(<Test />);
    screen.debug();
    expect(screen.getByText('Welcome Home!')).toBeVisible();
  });
});
