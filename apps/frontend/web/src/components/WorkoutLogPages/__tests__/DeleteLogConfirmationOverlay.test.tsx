import { render, screen } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { sampleWorkoutLogs } from '@cwt/mocks';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';

vi.mock('@cwt/hooks', () => ({
  useWorkoutContextWeb: vi.fn(),
  useWorkoutLogDetailContextWeb: vi.fn(),
}));

vi.mock('@cwt/state/stores', () => ({
  useAuthStore: vi.fn(),
  useWorkoutLibraryStore: vi.fn(),
  useWorkoutDraftStore: vi.fn(),
}));

vi.mock('../../services/workoutsService', () => ({
  deleteWorkoutLog: vi.fn(),
}));

describe('DeleteLogConfirmationOverlay', () => {
  beforeEach(async () => {
    // Setup default mock return values
    const { useWorkoutContextWeb, useWorkoutLogDetailContextWeb } =
      await import('@cwt/hooks');
    const { useAuthStore, useWorkoutLibraryStore } = await import(
      '@cwt/state/stores'
    );

    vi.mocked(useWorkoutContextWeb).mockReturnValue({
      webOverlayHandlers: {
        deleteLogOverlayOpened: true,
        deleteLogOverlayHandler: {
          open: vi.fn(),
          close: vi.fn(),
          toggle: vi.fn(),
        },
      },
    });

    vi.mocked(useWorkoutLogDetailContextWeb).mockReturnValue({
      workout: sampleWorkoutLogs[0],
      webOverlayHandlers: {
        handlers: {
          open: vi.fn(),
          close: vi.fn(),
          toggle: vi.fn(),
        },
      },
      setWorkout: vi.fn(),
    });

    vi.mocked(useAuthStore).mockReturnValue({
      session: { access_token: 'test-token' },
    });

    vi.mocked(useWorkoutLibraryStore).mockReturnValue({
      deleteWorkout: vi.fn(),
    });
  });
  it('renders when deleteLogOverlayOpened is true', () => {
    render(<DeleteLogConfirmationOverlay />);

    const title = screen.getByRole('heading', { name: /Delete Log/i });
    const message = screen.getByText(
      /Are you sure you want to delete this log?/i,
    );

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  // it('deletes workout and closes detail overlay on successful deletion', () => {});

  // it('logs error and does not update store if API call fails', () => {});

  // it('returns early and logs error if session is not found', () => {});

  // it('calls deleteWorkoutLog with access token and workout ID', () => {});
});
