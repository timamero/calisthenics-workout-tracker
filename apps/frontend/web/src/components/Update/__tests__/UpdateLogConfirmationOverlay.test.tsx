import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

import { sampleWorkoutLogs } from '@cwt/mocks';
import { type WorkoutLibrarySlice } from '@cwt/state/stores';

import UpdateLogConfirmationOverlay from '../UpdateLogConfirmationOverlay';
import * as workoutsService from '../../../services/workoutsService';
import type { WorkoutContextType } from '@cwt/context';
import type { UseDisclosureHandlers } from '@mantine/hooks';

// TODO: Need to test that on successful update, user is redirected to history page

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

let updateWorkoutSpy: Mock<WorkoutLibrarySlice['deleteWorkout']>; // fix
let isUpdateOverlayOpened: boolean = true;
let isLogDetailOverlayOpened: boolean = true;
let mockSession: { access_token: string } | null;
let workoutLogDetailsOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
let updateLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

describe('UpdateLogConfirmationOverlay', async () => {
  beforeEach(async () => {
    import.meta.env.VITE_ENVIRONMENT = 'local-isolated';

    updateWorkoutSpy = vi.fn();
    isUpdateOverlayOpened = true;
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
    updateLogOverlayHandlerSpy = {
      open: vi.fn(() => {
        isUpdateOverlayOpened = true;
      }),
      close: vi.fn(() => {
        isUpdateOverlayOpened = false;
      }),
      toggle: vi.fn(() => {
        isUpdateOverlayOpened = !isUpdateOverlayOpened;
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
          return isUpdateOverlayOpened;
        },
        deleteLogOverlayHandler: updateLogOverlayHandlerSpy, // fix
        // updateLogOverlayHandler: updateLogOverlayHandlerSpy,
      }),
    }));

    vi.mocked(useWorkoutDraftStore).mockImplementation((selector: unknown) => {
      const mockState = {
        setExerciseIDToMod: vi.fn(),
        setSupersetIDToMod: vi.fn(),
        setSectionIDToMod: vi.fn(),
      };
      if (typeof selector === 'function') {
        return selector(mockState);
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

    vi.mocked(useAuthStore).mockImplementation((selector: unknown) => {
      const mockState = {
        session: mockSession,
      };
      if (typeof selector == 'function') {
        return selector(mockState);
      }
      return mockState;
    });

    vi.mocked(useWorkoutLibraryStore).mockImplementation(
      (selector: unknown) => {
        const mockState = {
          updateWorkout: updateWorkoutSpy,
        };
        if (typeof selector === 'function') {
          return selector(mockState);
        }
      },
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it.skip('renders when updateLogOverlayOpened is true', () => {
    render(<UpdateLogConfirmationOverlay />);

    const title = screen.getByRole('heading', { name: /Save Updated Log/i });
    const message = screen.getByText(
      /Save changes to this log? This cannot be undone./i,
    );

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it.skip('updates workout, redirects user to history route, and opens workout log detail on successful update', async () => {
    const updateWorkoutLogSpy = vi.spyOn(workoutsService, 'deleteWorkoutLog'); // fix

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(updateLogOverlayHandlerSpy.close).toHaveBeenCalled();
      expect(updateWorkoutLogSpy).toHaveBeenCalled();
      expect(updateWorkoutSpy).toHaveBeenCalled();
      // test redirect to history
      expect(workoutLogDetailsOverlayHandlerSpy.open).toHaveBeenCalled();
    });
  });

  it.skip('logs error and does not update store if API call fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const updateWorkoutLogSpy = vi
      .spyOn(workoutsService, 'deleteWorkoutLog') // fix
      .mockRejectedValueOnce(new Error('Save updated log failed'));

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(updateWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ log: sampleWorkoutLogs }),
      );
    });

    expect(updateWorkoutSpy).not.toHaveBeenCalled();
    // test that redirect was not processed
    expect(workoutLogDetailsOverlayHandlerSpy.open).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error updating log:',
      expect.any(Error),
    );
  });

  it.skip('clicking Save without a session logs an error and does not call the API', async () => {
    mockSession = null;
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const updateWorkoutLogSpy = vi.spyOn(workoutsService, 'deleteWorkoutLog'); // fix

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Session not found');
    });

    expect(updateWorkoutLogSpy).not.toHaveBeenCalled();
    expect(updateWorkoutSpy).not.toHaveBeenCalled();
    // test that redirect was not processed
    expect(workoutLogDetailsOverlayHandlerSpy.open).not.toHaveBeenCalled();
  });

  it.skip('calls updateWorkoutLog with access token and workout ID', async () => {
    const deleteWorkoutLogSpy = vi
      .spyOn(workoutsService, 'deleteWorkoutLog') // fix
      .mockResolvedValueOnce(sampleWorkoutLogs[0]); // fix

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(deleteWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ log: sampleWorkoutLogs }),
      );
    });
  });
});
