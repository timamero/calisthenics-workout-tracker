import {
  render,
  screen,
  fireEvent,
  waitFor,
  // renderHook,
} from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

import { sampleWorkoutLogs } from '@cwt/mocks';
import { type WorkoutLibrarySlice } from '@cwt/state/stores';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';
import * as workoutsService from '../../../services/workoutsService';
// import { useWorkoutLibraryStore } from '@cwt/state/stores';

vi.mock('@cwt/hooks', () => ({
  useWorkoutContextWeb: vi.fn(),
  useWorkoutLogDetailContextWeb: vi.fn(),
}));

// const mockDeleteWorkout = vi.fn();
vi.mock('@cwt/state/stores', () => ({
  useAuthStore: vi.fn(),
  useWorkoutLibraryStore: vi.fn(),
  useWorkoutDraftStore: vi.fn(),
}));

vi.mock('../../services/workoutsService', () => ({
  deleteWorkoutLog: vi.fn(),
}));

let deleteWorkoutSpy: Mock<WorkoutLibrarySlice['deleteWorkout']>;
let isOverlayOpened: boolean = true;
let deleteLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

describe('DeleteLogConfirmationOverlay', () => {
  beforeEach(async () => {
    deleteWorkoutSpy = vi.fn();
    isOverlayOpened = true;
    deleteLogOverlayHandlerSpy = {
      open: vi.fn(() => {
        isOverlayOpened = true;
      }),
      close: vi.fn(() => {
        isOverlayOpened = false;
      }),
      toggle: vi.fn(() => {
        isOverlayOpened = !isOverlayOpened;
      }),
    };

    // Setup default mock return values
    const { useWorkoutContextWeb, useWorkoutLogDetailContextWeb } =
      await import('@cwt/hooks');
    const { useAuthStore, useWorkoutLibraryStore } = await import(
      '@cwt/state/stores'
    );

    vi.mocked(useWorkoutContextWeb).mockImplementation(() => ({
      webOverlayHandlers: {
        get deleteLogOverlayOpened() {
          return isOverlayOpened;
        },
        deleteLogOverlayHandler: deleteLogOverlayHandlerSpy,
      },
    }));

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

    vi.mocked(useWorkoutLibraryStore).mockImplementation((selector) => {
      const mockState = {
        deleteWorkout: deleteWorkoutSpy,
      };
      if (typeof selector === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return selector(mockState as any);
      }
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

  it('deletes workout and closes detail overlay on successful deletion', async () => {
    const deleteWorkoutLogSpy = vi.spyOn(workoutsService, 'deleteWorkoutLog');

    const { rerender } = render(<DeleteLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Delete$/i }));

    await waitFor(() => {
      expect(deleteLogOverlayHandlerSpy.close).toHaveBeenCalled();
      expect(deleteWorkoutLogSpy).toHaveBeenCalled();
      expect(deleteWorkoutSpy).toHaveBeenCalled();
    });

    // const title = screen.getByRole('heading', { name: /Delete Log/i });
    // const message = screen.getByText(
    //   /Are you sure you want to delete this log?/i,
    // );
    // expect(title).not.toBeInTheDocument();
    // expect(message).not.toBeInTheDocument();
    rerender(<DeleteLogConfirmationOverlay />);
    // expect(
    //   screen.queryByText('Are you sure you want to delete this log?'),
    // ).not.toBeInTheDocument();
  });

  // it('logs error and does not update store if API call fails', () => {});

  // it('returns early and logs error if session is not found', () => {});

  // it('calls deleteWorkoutLog with access token and workout ID', () => {});
});
