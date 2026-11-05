import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { linkOptions, type NavigateFn } from '@tanstack/react-router';

import { sampleWorkoutLogs } from '@cwt/mocks';
import type { WorkoutLibrarySlice, WorkoutDraftSlice } from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import UpdateLogConfirmationOverlay from '../UpdateLogConfirmationOverlay';
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
  cancelUpdateLogOverlayOpened: false,
  cancelUpdateLogOverlayHandler: makeDisclosure(),
  updateLogOverlayOpened: false,
  updateLogOverlayHandler: makeDisclosure(),
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

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>(
    '@tanstack/react-router',
  );

  return {
    ...actual,
    useNavigate: () => navigateSpy,
  };
});

let navigateSpy: NavigateFn;
let updateWorkoutSpy: Mock<WorkoutLibrarySlice['updateWorkout']>;
let setModeSpy: Mock<WorkoutDraftSlice['setMode']>;
let workoutToSave: WorkoutLogResponse;
let isUpdateOverlayOpened: boolean = true;
let isLogDetailOverlayOpened: boolean = false;
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

    navigateSpy = vi.fn();
    updateWorkoutSpy = vi.fn();
    setModeSpy = vi.fn();
    workoutToSave = sampleWorkoutLogs[0];
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
        get updateLogOverlayOpened() {
          return isUpdateOverlayOpened;
        },
        updateLogOverlayHandler: updateLogOverlayHandlerSpy,
      }),
    }));

    vi.mocked(useWorkoutDraftStore).mockImplementation((selector: unknown) => {
      const mockState = {
        workoutToSave: workoutToSave,
        setMode: setModeSpy,
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
  it('renders when updateLogOverlayOpened is true', () => {
    render(<UpdateLogConfirmationOverlay />);

    const title = screen.getByRole('heading', { name: /Save Changes?/i });
    const message = screen.getByText(
      /Do you want to save the updates to this workout log?/i,
    );

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('resets workout draft state after successfully updating workout', async () => {
    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      // add tests here
    });
  });

  it('updates workout, redirects user to history route, and opens workout log detail on successful update', async () => {
    const updateWorkoutLogSpy = vi.spyOn(workoutsService, 'updateWorkoutLog');

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(updateLogOverlayHandlerSpy.close).toHaveBeenCalled();
      expect(updateWorkoutLogSpy).toHaveBeenCalled();
      expect(updateWorkoutSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(
        expect.objectContaining(
          linkOptions({
            to: '/dashboard/history',
          }),
        ),
      );
    });
  });

  it('opens workout log detail in read mode after a successful update', async () => {
    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(workoutLogDetailsOverlayHandlerSpy.open).toHaveBeenCalled();
      expect(setModeSpy).toHaveBeenCalledWith('read');
    });
  });

  it('logs error and does not update store if API call fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const updateWorkoutLogSpy = vi
      .spyOn(workoutsService, 'updateWorkoutLog')
      .mockRejectedValueOnce(new Error('Update log failed'));

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(updateWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify(sampleWorkoutLogs[0]),
      );
    });

    expect(updateWorkoutSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(workoutLogDetailsOverlayHandlerSpy.open).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error updating log:',
      expect.any(Error),
    );
  });

  it('clicking Save without a session logs an error and does not call the API', async () => {
    mockSession = null;
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const updateWorkoutLogSpy = vi.spyOn(workoutsService, 'updateWorkoutLog');

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Session not found');
    });

    expect(updateWorkoutLogSpy).not.toHaveBeenCalled();
    expect(updateWorkoutSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(workoutLogDetailsOverlayHandlerSpy.open).not.toHaveBeenCalled();
  });

  it('calls updateWorkoutLog with access token and workout log', async () => {
    const updateWorkoutLogSpy = vi
      .spyOn(workoutsService, 'updateWorkoutLog')
      .mockResolvedValueOnce(sampleWorkoutLogs[0]);

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Save$/i }));

    await waitFor(() => {
      expect(updateWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify(sampleWorkoutLogs[0]),
      );
    });
  });
});
