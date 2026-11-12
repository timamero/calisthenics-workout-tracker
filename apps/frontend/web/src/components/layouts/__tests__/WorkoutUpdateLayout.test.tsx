import { render, screen, fireEvent, waitFor } from '../../../utils/testUtils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { sampleWorkoutLogs } from '@cwt/mocks';
import type { WorkoutDraftSlice } from '@cwt/state/stores';

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

vi.mock('@cwt/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@cwt/hooks')>();

  return {
    ...actual,
    useWorkoutContextWeb: vi.fn(),
    useWorkoutLogDetailContextWeb: vi.fn(),
  };
});

vi.mock('@cwt/state/stores', () => ({
  useAuthStore: vi.fn(),
  useWorkoutLibraryStore: vi.fn(),
  useWorkoutDraftStore: vi.fn(),
}));

let initializeUpdatedWorkoutToSaveSpy: Mock<
  WorkoutDraftSlice['initializeUpdatedWorkoutToSave']
>;
let isUpdateOverlayOpened: boolean = false;
let isCancelUpdateOverlayOpened: boolean = false;
let updateLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
let cancelUpdateLogOverlayHandlerSpy: {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

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

    initializeUpdatedWorkoutToSaveSpy = vi.fn();
    isUpdateOverlayOpened = false;
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
    const { useWorkoutDraftStore } = await import('@cwt/state/stores');

    vi.mocked(useWorkoutContextWeb).mockImplementation(() => ({
      webOverlayHandlers: makeWebHandlers({
        get updateLogOverlayOpened() {
          return isUpdateOverlayOpened;
        },
        updateLogOverlayHandler: updateLogOverlayHandlerSpy,
        get cancelUpdateLogOverlayOpened() {
          return isCancelUpdateOverlayOpened;
        },
        cancelUpdateLogOverlayHandler: cancelUpdateLogOverlayHandlerSpy,
      }),
    }));

    vi.mocked(useWorkoutDraftStore).mockImplementation((selector: unknown) => {
      const mockState = {
        initializeUpdatedWorkoutToSave: initializeUpdatedWorkoutToSaveSpy,
      };
      if (typeof selector === 'function') {
        return selector(mockState);
      }
    });

    vi.mocked(useWorkoutLogDetailContextWeb).mockReturnValue({
      workout: sampleWorkoutLogs[0],
      webOverlayHandlers: {
        get opened() {
          return false;
        },
        handlers: {
          open: vi.fn(() => {
            isUpdateOverlayOpened = true;
          }),
          close: vi.fn(() => {
            isUpdateOverlayOpened = false;
          }),
          toggle: vi.fn(() => {
            isUpdateOverlayOpened = !isUpdateOverlayOpened;
          }),
        },
      },
      setWorkout: vi.fn(),
    });
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
  it('renders with overlays closed', async () => {
    await renderWorkoutUpdateLayout();

    expect(isUpdateOverlayOpened).toBe(false);
    expect(isCancelUpdateOverlayOpened).toBe(false);
  });

  it('opens updateLogOverlay on Save button click', async () => {
    await renderWorkoutUpdateLayout();

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(updateLogOverlayHandlerSpy.open).toHaveBeenCalled();
      expect(isUpdateOverlayOpened).toBe(true);
    });
  });

  it('sets initializeUpdatedWorkoutToSave on Save button click', async () => {
    await renderWorkoutUpdateLayout();

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(initializeUpdatedWorkoutToSaveSpy).toHaveBeenCalledWith(
        sampleWorkoutLogs[0],
      );
    });
  });

  it('opens cancelUpdateLogOverlay on Cancel button click', async () => {
    await renderWorkoutUpdateLayout();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    await waitFor(() => {
      expect(cancelUpdateLogOverlayHandlerSpy.open).toHaveBeenCalled();
      expect(isCancelUpdateOverlayOpened).toBe(true);
    });
  });
});
