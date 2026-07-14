import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

import { sampleWorkoutLogs } from '@cwt/mocks';
import { type WorkoutLibrarySlice } from '@cwt/state/stores';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';
import * as workoutsService from '../../../services/workoutsService';
import type { WorkoutContextType } from '@cwt/context';
import type { UseDisclosureHandlers } from '@mantine/hooks';

// Typed factory to satisfy full webOverlayHandlers shape while tests override only needed fields.
type WebHandlers = NonNullable<WorkoutContextType['webOverlayHandlers']>;
const makeDisclosure = (): UseDisclosureHandlers => ({
  open: vi.fn(),
  close: vi.fn(),
  toggle: vi.fn(),
});
const makeWebHandlers = (
  overrides: Partial<WebHandlers> = {},
): WebHandlers => ({
  deleteLogOverlayOpened: false,
  deleteLogOverlayHandler: makeDisclosure(),
  deleteRootItemOverlayOpened: false,
  deleteRootItemOverlayHandler: makeDisclosure(),
  deleteNestedItemOverlayOpened: false,
  deleteNestedItemOverlayHandler: makeDisclosure(),
  deleteSetOverlayOpened: false,
  deleteSetOverlayHandler: makeDisclosure(),
  deleteSetInSupersetOverlayOpened: false,
  deleteSetInSupersetOverlayHandler: makeDisclosure(),
  saveOverlayOpened: false,
  saveOverlayHandler: makeDisclosure(),
  cancelOverlayOpened: false,
  cancelOverlayHandler: makeDisclosure(),
  ...overrides,
});

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
let mockSession: { access_token: string } | null;
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
    import.meta.env.VITE_ENVIRONMENT = 'local-isolated';

    deleteWorkoutSpy = vi.fn();
    isDeleteOverlayOpened = true;
    mockSession = { access_token: 'test-token' };
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
      webOverlayHandlers: makeWebHandlers({
        get deleteLogOverlayOpened() {
          return isDeleteOverlayOpened;
        },
        deleteLogOverlayHandler: deleteLogOverlayHandlerSpy,
      }),
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useAuthStore).mockImplementation((selector: any) => {
      const mockState = {
        session: mockSession,
      };
      if (typeof selector == 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return selector(mockState as any);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return mockState as any;
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

  it('logs error and does not update store if API call fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const deleteWorkoutLogSpy = vi
      .spyOn(workoutsService, 'deleteWorkoutLog')
      .mockRejectedValueOnce(new Error('Delete log failed'));

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Delete$/i }));

    await waitFor(() => {
      expect(deleteWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ id: sampleWorkoutLogs[0].id }),
      );
    });

    expect(deleteWorkoutSpy).not.toHaveBeenCalled();
    expect(workoutLogDetailsOverlayHandlerSpy.close).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error deleting log:',
      expect.any(Error),
    );
  });

  it('clicking Delete without a session logs an error and does not call the API', async () => {
    mockSession = null;
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const deleteWorkoutLogSpy = vi.spyOn(workoutsService, 'deleteWorkoutLog');

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Delete$/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Session not found');
    });

    expect(deleteWorkoutLogSpy).not.toHaveBeenCalled();
    expect(deleteWorkoutSpy).not.toHaveBeenCalled();
    expect(workoutLogDetailsOverlayHandlerSpy.close).not.toHaveBeenCalled();
  });

  it('calls deleteWorkoutLog with access token and workout ID', async () => {
    const deleteWorkoutLogSpy = vi
      .spyOn(workoutsService, 'deleteWorkoutLog')
      .mockResolvedValueOnce(sampleWorkoutLogs[0]);

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Delete$/i }));

    await waitFor(() => {
      expect(deleteWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ id: sampleWorkoutLogs[0].id }),
      );
    });
  });
});
