import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { linkOptions, type NavigateFn } from '@tanstack/react-router';

import { sampleWorkoutLogs } from '@cwt/mocks';
import type { WorkoutLibrarySlice, WorkoutDraftSlice } from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import CancelUpdateLogConfirmationOverlay from '../CancelUpdateLogConfirmationOverlay';
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
let isCancelUpdateOverlayOpened: boolean = true;
let isLogDetailOverlayOpened: boolean = false;
let mockSession: { access_token: string } | null;
let workoutLogDetailsOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
let cancelUpdateLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

describe('CancelUpdateLogConfirmationOverlay', async () => {
  beforeEach(async () => {
    import.meta.env.VITE_ENVIRONMENT = 'local-isolated';

    navigateSpy = vi.fn();
    updateWorkoutSpy = vi.fn();
    setModeSpy = vi.fn();
    workoutToSave = sampleWorkoutLogs[0];
    isCancelUpdateOverlayOpened = true;
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
    cancelUpdateLogOverlayHandlerSpy = {
      open: vi.fn(() => {
        isCancelUpdateOverlayOpened = true;
      }),
      close: vi.fn(() => {
        isCancelUpdateOverlayOpened = false;
      }),
      toggle: vi.fn(() => {
        isCancelUpdateOverlayOpened = !isCancelUpdateOverlayOpened;
      }),
    };

    // Setup default mock return values
    const { useWorkoutContextWeb, useWorkoutLogDetailContextWeb } =
      await import('@cwt/hooks');
    const { useAuthStore, useWorkoutLibraryStore, useWorkoutDraftStore } =
      await import('@cwt/state/stores');

    vi.mocked(useWorkoutContextWeb).mockImplementation(() => ({
      webOverlayHandlers: makeWebHandlers({
        get cancelUpdateLogOverlayOpened() {
          return isCancelUpdateOverlayOpened;
        },
        cancelUpdateLogOverlayHandler: cancelUpdateLogOverlayHandlerSpy,
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
  it.skip('renders when cancelUpdateLogOverlayOpened is true', () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    const title = screen.getByRole('heading', { name: /Discard changes?/i });
    const message = screen.getByText(
      /You have unsaved changes. If you go back now, your edits will be lost./i,
    );

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it.skip('on Discard changes click, redirects user to history route', async () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Discard changes$/i }));

    await waitFor(() => {
      expect(cancelUpdateLogOverlayHandlerSpy.close).toHaveBeenCalled();
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
  it.skip('on Keep editing click, cancelLogUpdateOverlay is not rendered', async () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Discard changes$/i }));

    await waitFor(() => {
      expect(cancelUpdateLogOverlayHandlerSpy.close).toHaveBeenCalled();
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
  it.skip('on Discard changes click, workout is not updated', async () => {
    const updateWorkoutLogSpy = vi.spyOn(workoutsService, 'updateWorkoutLog');

    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Discard changes$/i }));

    await waitFor(() => {
      expect(updateWorkoutLogSpy).not.toHaveBeenCalled();
      expect(updateWorkoutSpy).not.toHaveBeenCalled();
    });
  });

  it.skip('on Discard changes click, opens workout log detail in read mode', async () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.click(screen.getByRole('button', { name: /^Discard changes$/i }));

    await waitFor(() => {
      expect(workoutLogDetailsOverlayHandlerSpy.open).toHaveBeenCalled();
      expect(setModeSpy).toHaveBeenCalledWith('read');
    });
  });
});
