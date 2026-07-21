import { fireEvent, render, screen, waitFor } from '../../../utils/testUtils';

import { sampleWorkoutLogs } from '@cwt/mocks';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';
import * as workoutsService from '../../../services/workoutsService';

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
  useAuthStore: (selector: unknown) => mockUseAuthStore(selector),
  useWorkoutLibraryStore: (selector: unknown) =>
    mockUseWorkoutLibraryStore(selector),
}));

describe('DeleteConfirmationOverlay', () => {
  let isDeleteOverlayOpened = true;
  let setIsDeleteLogOverlayVisibleSpy = jest.fn();
  let setWorkoutSpy = jest.fn();
  let deleteWorkoutSpy = jest.fn();
  let session: { access_token: string } | null;
  let deleteWorkoutLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    isDeleteOverlayOpened = true;
    session = { access_token: 'test-token' };
    deleteWorkoutSpy = jest.fn();

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

    mockUseAuthStore.mockImplementation((selector: any) => {
      const mockState = { session };
      return typeof selector === 'function' ? selector(mockState) : mockState;
    });

    mockUseWorkoutLibraryStore.mockImplementation((selector: any) => {
      const mockState = { deleteWorkout: deleteWorkoutSpy };
      return typeof selector === 'function' ? selector(mockState) : mockState;
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

  it('deletes the workout, clears the detail workout, and navigates home on success', async () => {
    deleteWorkoutLogSpy = jest
      .spyOn(workoutsService, 'deleteWorkoutLog')
      .mockResolvedValueOnce(sampleWorkoutLogs[0]);

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Delete', { exact: true }));

    await waitFor(() => {
      expect(deleteWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ id: sampleWorkoutLogs[0].id }),
      );
      expect(deleteWorkoutSpy).toHaveBeenCalledWith(sampleWorkoutLogs[0].id);
      expect(setWorkoutSpy).toHaveBeenCalledWith(null);
      expect(mockNavigate).toHaveBeenCalledWith('App', { screen: 'History' });
    });
  });

  it('logs an error and does not update state when the API call fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    deleteWorkoutLogSpy = jest
      .spyOn(workoutsService, 'deleteWorkoutLog')
      .mockRejectedValueOnce(new Error('Delete log failed'));

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Delete', { exact: true }));

    await waitFor(() => {
      expect(deleteWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ id: sampleWorkoutLogs[0].id }),
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error deleting log:',
        expect.any(Error),
      );
    });

    expect(deleteWorkoutSpy).not.toHaveBeenCalled();
    expect(setWorkoutSpy).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('logs an error and does not call the API when there is no session', async () => {
    session = null;
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    deleteWorkoutLogSpy = jest.spyOn(workoutsService, 'deleteWorkoutLog');

    render(<DeleteLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Delete', { exact: true }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Session not found');
    });

    expect(deleteWorkoutLogSpy).not.toHaveBeenCalled();
    expect(deleteWorkoutSpy).not.toHaveBeenCalled();
    expect(setWorkoutSpy).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
