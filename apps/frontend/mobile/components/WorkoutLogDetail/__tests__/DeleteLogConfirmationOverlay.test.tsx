import { render, screen } from '../../../utils/testUtils';

import { sampleWorkoutLogs } from '@cwt/mocks';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';

// ---- Mocks for React Navigation and Context Hooks --//
const mockNavigate = jest.fn();
const mockUseWorkoutContextMobile = jest.fn();
const mockUseWorkoutLogDetailContextMobile = jest.fn();
const mockUseAuthStore = jest.fn();
const mockUseWorkoutLibraryStore = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@cwt/hooks', () => ({
  useWorkoutContextMobile: () => mockUseWorkoutContextMobile(),
  useWorkoutLogDetailContextMobile: () =>
    mockUseWorkoutLogDetailContextMobile(),
}));

// ---- Mocks for State Management Hooks --//
jest.mock('@cwt/state/stores', () => ({
  useAuthStore: () => mockUseAuthStore(),
  useWorkoutLibraryStore: () => mockUseWorkoutLibraryStore(),
}));

describe('DeleteConfirmationOverlay', () => {
  let isDeleteOverlayOpened: boolean = true;
  let setIsDeleteLogOverlayVisibleSpy = jest.fn();
  let setWorkoutSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    isDeleteOverlayOpened = true;

    mockUseWorkoutContextMobile.mockReturnValue({
      mobileOverlayHandlers: {
        isDeleteLogOverlayVisible: isDeleteOverlayOpened,
        setIsDeleteLogOverlayVisible: setIsDeleteLogOverlayVisibleSpy,
      },
    });

    mockUseWorkoutLogDetailContextMobile.mockReturnValue({
      workout: sampleWorkoutLogs[0],
      setWorkout: setWorkoutSpy,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isDeleteLogOverlayVisible is true', () => {
    render(<DeleteLogConfirmationOverlay />);

    const title = screen.getByText(/Delete Log/i);
    const message = screen.getByText(
      /Are you sure you want to delete this log?/i,
    );

    expect(title).toBeOnTheScreen();
    expect(message).toBeOnTheScreen();
  });

  // TODO: Complete creating tests for this component
});
