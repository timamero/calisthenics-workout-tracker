import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
describe('Sanity Check', () => {
  test('renders simple JSX', () => {
    render(<div>Hello World</div>);
    screen.debug();
    expect(screen.getByText('Hello World')).toBeVisible();
  });
});
