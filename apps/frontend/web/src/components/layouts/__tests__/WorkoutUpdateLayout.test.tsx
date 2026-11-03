import {
  fileRouteRender,
  screen,
  // fireEvent,
  // waitFor,
} from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { type HistoryState, type ParsedLocation } from '@tanstack/react-router';

import { sampleWorkoutLogs } from '@cwt/mocks';
import type { WorkoutDraftSlice } from '@cwt/state/stores';
import type {
  Exercise,
  Section,
  Superset,
  // WorkoutLogResponse,
} from '@cwt/schema/workouts';

import WorkoutUpdateLayout from '../WorkoutUpdateLayout';
import type { WorkoutContextType } from '@cwt/context';
import type { UseDisclosureHandlers } from '@mantine/hooks';

// Typed factory to satisfy full webOverlayHandlers shape while tests override only needed fields.
type WebHandlers = NonNullable<WorkoutContextType['webOverlayHandlers']>;
const makeDisclosure = (): UseDisclosureHandlers => ({
  open: vi.fn(),
  close: vi.fn(),
  toggle: vi.fn(),
});

// https://tanstack.com/router/latest/docs/api/router/ParsedHistoryStateType
type ParsedHistoryState = HistoryState & {
  key?: string; // TODO: Remove in v2 - use __TSR_key instead
  __TSR_key?: string;
  __TSR_index: number;
};

const makeWebHandlers = (
  overrides: Partial<WebHandlers> = {},
): WebHandlers => ({
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
    useLocation: () => locationSpy,
  };
});

let locationSpy: ParsedLocation;
// let updateWorkoutSpy: Mock<WorkoutLibrarySlice['updateWorkout']>;
let setModeSpy: Mock<WorkoutDraftSlice['setMode']>;
let workoutData: Array<Exercise | Section | Superset>;
// let workoutToSave: WorkoutLogResponse;
let isUpdateOverlayOpened: boolean = true;
// let mockSession: { access_token: string } | null;
let updateLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// let title: string = sampleWorkoutLogs[0].title;

describe('WorkoutUpdateLayout', async () => {
  beforeEach(async () => {
    import.meta.env.VITE_ENVIRONMENT = 'local-isolated';

    locationSpy = {
      pathname: '/update',
      href: '',
      search: {},
      searchStr: '',
      state: {} as ParsedHistoryState,
      hash: '',
      publicHref: '',
      external: false,
    };
    // updateWorkoutSpy = vi.fn();
    setModeSpy = vi.fn();
    workoutData = sampleWorkoutLogs[0].workout_data.data;
    // workoutToSave = sampleWorkoutLogs[0];
    isUpdateOverlayOpened = false;
    // mockSession = { access_token: 'test-token' };
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
    const { useWorkoutContextWeb } = await import('@cwt/hooks');
    const { useWorkoutDraftStore } = await import('@cwt/state/stores');

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
        workoutData: workoutData,
        setMode: setModeSpy,
        setExerciseIDToMod: vi.fn(),
        setSupersetIDToMod: vi.fn(),
        setSectionIDToMod: vi.fn(),
      };
      if (typeof selector === 'function') {
        return selector(mockState);
      }
    });

    // vi.mocked(useWorkoutLogDetailContextWeb).mockReturnValue({
    //   workout: sampleWorkoutLogs[0],
    //   webOverlayHandlers: {
    //     get opened() {
    //       return isLogDetailOverlayOpened;
    //     },
    //     handlers: workoutLogDetailsOverlayHandlerSpy,
    //   },
    //   setWorkout: vi.fn(),
    // });

    // vi.mocked(useAuthStore).mockImplementation((selector: unknown) => {
    //   const mockState = {
    //     session: mockSession,
    //   };
    //   if (typeof selector == 'function') {
    //     return selector(mockState);
    //   }
    //   return mockState;
    // });

    // vi.mocked(useWorkoutLibraryStore).mockImplementation(
    //   (selector: unknown) => {
    //     const mockState = {
    //       updateWorkout: updateWorkoutSpy,
    //     };
    //     if (typeof selector === 'function') {
    //       return selector(mockState);
    //     }
    //   },
    // );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it.skip('renders with buttons and workout title', () => {
    fileRouteRender(<WorkoutUpdateLayout />, {
      initialLocation: '/_auth/update/',
    });

    // const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const letsGoTest = screen.getByText(/lets go/i);
    // const cancelButton = screen.getByText(/Cancel/i);
    // const saveButton = screen.getByText(/Save/i);
    // const saveButton = screen.getByRole('button', { name: /Save/i });
    // const titleText = screen.getByText(/Morning Push Workout/i);

    expect(letsGoTest).toBeInTheDocument();
    // expect(cancelButton).toBeInTheDocument();
    // expect(saveButton).toBeInTheDocument();
    // expect(titleText).toBeInTheDocument();
  });
});
