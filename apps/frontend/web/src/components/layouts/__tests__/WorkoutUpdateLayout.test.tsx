import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

// import { sampleWorkoutLogs } from '@cwt/mocks';
// import type { WorkoutDraftSlice } from '@cwt/state/stores';
// import type {
//   Exercise,
//   Section,
//   Superset,
//   // WorkoutLogResponse,
// } from '@cwt/schema/workouts';

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

// vi.mock('@cwt/hooks', () => ({
//   useWorkoutContextWeb: vi.fn(),
//   useWorkoutLogDetailContextWeb: vi.fn(),
// }));
vi.mock('@cwt/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@cwt/hooks')>();

  return {
    ...actual,
    useWorkoutContextWeb: vi.fn(),
    useWorkoutLogDetailContextWeb: vi.fn(),
    // useAddSuperset: vi.fn(),
  };
});

vi.mock('@cwt/state/stores', () => ({
  useAuthStore: vi.fn(),
  useWorkoutLibraryStore: vi.fn(),
  useWorkoutDraftStore: vi.fn(),
}));

// let updateWorkoutSpy: Mock<WorkoutLibrarySlice['updateWorkout']>;
// let setModeSpy: Mock<WorkoutDraftSlice['setMode']>;
// let workoutData: Array<Exercise | Section | Superset>;
// let workoutToSave: WorkoutLogResponse;
let isUpdateOverlayOpened: boolean = true;
// let mockSession: { access_token: string } | null;
let updateLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// let title: string = sampleWorkoutLogs[0].title;

async function renderWorkoutUpdateLayout() {
  const rootRoute = createRootRoute({
    component: WorkoutUpdateLayout,
  });

  const updateRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/update',
    component: () => null,
  });

  const routeTree = rootRoute.addChildren([updateRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/update'],
    }),
  });

  await router.load();

  return render(<RouterProvider router={router} />);
}

describe('WorkoutUpdateLayout', async () => {
  beforeEach(async () => {
    import.meta.env.VITE_ENVIRONMENT = 'local-isolated';

    // updateWorkoutSpy = vi.fn();
    // setModeSpy = vi.fn();
    // workoutData = sampleWorkoutLogs[0].workout_data.data;
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
    // const { useWorkoutDraftStore } = await import('@cwt/state/stores');

    vi.mocked(useWorkoutContextWeb).mockImplementation(() => ({
      webOverlayHandlers: makeWebHandlers({
        get updateLogOverlayOpened() {
          return isUpdateOverlayOpened;
        },
        updateLogOverlayHandler: updateLogOverlayHandlerSpy,
      }),
    }));

    // vi.mocked(useWorkoutDraftStore).mockImplementation((selector: unknown) => {
    //   const mockState = {
    //     workoutData: workoutData,
    //     setMode: setModeSpy,
    //     setExerciseIDToMod: vi.fn(),
    //     setSupersetIDToMod: vi.fn(),
    //     setSectionIDToMod: vi.fn(),
    //   };
    //   if (typeof selector === 'function') {
    //     return selector(mockState);
    //   }
    // });

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
  it('renders with header buttons', async () => {
    await renderWorkoutUpdateLayout();

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const saveButton = screen.getByRole('button', { name: /Save/i });

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it.skip('opens updateLogOverlay on Save button click', async () => {
    await renderWorkoutUpdateLayout();

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(updateLogOverlayHandlerSpy.open).toHaveBeenCalled();
    });
  });
});
