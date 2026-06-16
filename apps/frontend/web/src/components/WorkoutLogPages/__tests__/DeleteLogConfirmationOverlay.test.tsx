import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

import { sampleWorkoutLogs } from '@cwt/mocks';
import { type WorkoutLibrarySlice } from '@cwt/state/stores';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';
import * as workoutsService from '../../../services/workoutsService';

vi.mock('@cwt/hooks', () => ({
  useWorkoutContextWeb: vi.fn(),
  useWorkoutLogDetailContextWeb: vi.fn(),
}));

vi.mock('@cwt/state/stores', () => ({
  useAuthStore: vi.fn(),
  useWorkoutLibraryStore: vi.fn(),
  useWorkoutDraftStore: vi.fn(),
}));

let deleteWorkoutSpy: Mock<WorkoutLibrarySlice['deleteWorkout']>;
let isDeleteOverlayOpened: boolean = true;
let isLogDetailOverlayOpened: boolean = true;
let workoutLogDetailsOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
let deleteLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

describe('DeleteLogConfirmationOverlay', async () => {
  beforeEach(async () => {
    deleteWorkoutSpy = vi.fn();
    isDeleteOverlayOpened = true;
    workoutLogDetailsOverlayHandlerSpy = {
      open: vi.fn(() => {
        isLogDetailOverlayOpened = true;
      }),
      close: vi.fn(() => {
        isLogDetailOverlayOpened = false;
      }),
      toggle: vi.fn(() => {
        isLogDetailOverlayOpened = !isLogDetailOverlayOpened;
      }),
    };
    deleteLogOverlayHandlerSpy = {
      open: vi.fn(() => {
        isDeleteOverlayOpened = true;
      }),
      close: vi.fn(() => {
        isDeleteOverlayOpened = false;
      }),
      toggle: vi.fn(() => {
        isDeleteOverlayOpened = !isDeleteOverlayOpened;
      }),
    };

    // Setup default mock return values
    const { useWorkoutContextWeb, useWorkoutLogDetailContextWeb } =
      await import('@cwt/hooks');
    const { useAuthStore, useWorkoutLibraryStore, useWorkoutDraftStore } =
      await import('@cwt/state/stores');

    vi.mocked(useWorkoutContextWeb).mockImplementation(() => ({
      webOverlayHandlers: {
        get deleteLogOverlayOpened() {
          return isDeleteOverlayOpened;
        },
        deleteLogOverlayHandler: deleteLogOverlayHandlerSpy,
      },
    }));

    vi.mocked(useWorkoutDraftStore).mockImplementation((selector) => {
      const mockState = {
        setExerciseIDToMod: vi.fn(),
        setSupersetIDToMod: vi.fn(),
        setSectionIDToMod: vi.fn(),
      };
      if (typeof selector === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return selector(mockState as any);
      }
    });

    vi.mocked(useWorkoutLogDetailContextWeb).mockReturnValue({
      workout: sampleWorkoutLogs[0],
      webOverlayHandlers: {
        get opened() {
          return isLogDetailOverlayOpened;
        },
        handlers: workoutLogDetailsOverlayHandlerSpy,
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

  afterEach(() => {
    vi.restoreAllMocks();
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

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Delete$/i }));

    await waitFor(() => {
      expect(deleteLogOverlayHandlerSpy.close).toHaveBeenCalled();
      expect(deleteWorkoutLogSpy).toHaveBeenCalled();
      expect(deleteWorkoutSpy).toHaveBeenCalled();
      expect(workoutLogDetailsOverlayHandlerSpy.close).toHaveBeenCalled();
    });
  });

  // it('logs error and does not update store if API call fails', () => {});

  // it('returns early and logs error if session is not found', () => {});

  // it('calls deleteWorkoutLog with access token and workout ID', () => {});
});
