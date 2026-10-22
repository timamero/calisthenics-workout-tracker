import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../utils/testUtils';

import { sampleWorkoutLogs } from '@cwt/mocks';

import UpdateLogConfirmationOverlay from '../UpdateLogConfirmationOverlay';
import * as workoutsService from '../../../../services/workoutsService';

// ---- Mocks for React Navigation and Context Hooks --//
// const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockUseWorkoutContextMobile = jest.fn();
const mockUseWorkoutLogDetailContextMobile = jest.fn();
const mockUseAuthStore = jest.fn();
const mockUseWorkoutLibraryStore = jest.fn();
const mockUseWorkoutDraftStore = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    replace: mockReplace,
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
  useWorkoutDraftStore: (selector: unknown) =>
    mockUseWorkoutDraftStore(selector),
}));

describe('DeleteConfirmationOverlay', () => {
  let isUpdateOverlayOpened = true;
  let setIsUpdateLogOverlayVisibleSpy = jest.fn();
  let setWorkoutSpy = jest.fn();
  let updateWorkoutSpy = jest.fn();
  let session: { access_token: string } | null;
  let updateWorkoutLogSpy: jest.SpyInstance;
  let resetWorkoutSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    isUpdateOverlayOpened = true;
    session = { access_token: 'test-token' };
    updateWorkoutSpy = jest.fn();

    mockUseWorkoutContextMobile.mockReturnValue({
      mobileOverlayHandlers: {
        isDeleteLogOverlayVisible: isUpdateOverlayOpened, // replace with correct value
        setIsDeleteLogOverlayVisible: setIsUpdateLogOverlayVisibleSpy, // replace with correct value
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
      const mockState = { updateWorkout: updateWorkoutSpy };
      return typeof selector === 'function' ? selector(mockState) : mockState;
    });

    // may not need to reset workout
    mockUseWorkoutDraftStore.mockImplementation((selector: any) => {
      const mockState = { resetWorkout: resetWorkoutSpy };
      return typeof selector === 'function' ? selector(mockState) : mockState;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders when isUpdateLogOverlayVisible is true', () => {
    render(<UpdateLogConfirmationOverlay />);

    const title = screen.getByText(/Save Changes?/i);
    const message = screen.getByText(
      /Do you want to save the updates to this workout log?/i,
    );

    expect(title).toBeOnTheScreen();
    expect(message).toBeOnTheScreen();
  });

  it.skip('updates the workout, sets detail workout state, and navigates workout detail screen on success', async () => {
    updateWorkoutLogSpy = jest
      .spyOn(workoutsService, 'deleteWorkoutLog') // replace with updateWorkoutLog
      .mockResolvedValueOnce(sampleWorkoutLogs[0]); // fix value

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Save', { exact: true }));

    await waitFor(() => {
      expect(updateWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ id: sampleWorkoutLogs[0].id }),
      );
      expect(updateWorkoutSpy).toHaveBeenCalledWith(sampleWorkoutLogs[0].id); // fix
      expect(setWorkoutSpy).toHaveBeenCalledWith(null);
      expect(resetWorkoutSpy).toHaveBeenCalled(); // remove?
      // add test to for workout log detail state
      expect(mockReplace).toHaveBeenCalledWith('App', { screen: 'History' }); // fix
    });
  });

  it.skip('logs an error and does not update state when the API call fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    updateWorkoutLogSpy = jest
      .spyOn(workoutsService, 'deleteWorkoutLog') // fix
      .mockRejectedValueOnce(new Error('Update log failed'));

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Save', { exact: true }));

    await waitFor(() => {
      expect(updateWorkoutLogSpy).toHaveBeenCalledWith(
        'test-token',
        JSON.stringify({ id: sampleWorkoutLogs[0].id }), // fix
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error updateing log:',
        expect.any(Error),
      );
    });

    expect(updateWorkoutSpy).not.toHaveBeenCalled();
    expect(setWorkoutSpy).not.toHaveBeenCalled();
    expect(resetWorkoutSpy).not.toHaveBeenCalled(); // remove?
    // test that workout log detail state was not set
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it.skip('logs an error and does not call the API when there is no session', async () => {
    session = null;
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    updateWorkoutLogSpy = jest.spyOn(workoutsService, 'deleteWorkoutLog'); // fix

    render(<UpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Save', { exact: true }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Session not found');
    });

    expect(updateWorkoutLogSpy).not.toHaveBeenCalled();
    expect(updateWorkoutSpy).not.toHaveBeenCalled();
    expect(setWorkoutSpy).not.toHaveBeenCalled();
    expect(resetWorkoutSpy).not.toHaveBeenCalled(); // remove?
    // test that workout log detail state was not set
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
