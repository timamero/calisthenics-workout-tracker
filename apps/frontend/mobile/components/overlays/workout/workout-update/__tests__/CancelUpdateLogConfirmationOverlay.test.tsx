import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../utils/testUtils';

import { sampleWorkoutLogs } from '@cwt/mocks';

import CancelUpdateLogConfirmationOverlay from '../CancelUpdateLogConfirmationOverlay';
import * as workoutsService from '../../../../../services/workoutsService';

const mockReplace = jest.fn();
const mockUseWorkoutContextMobile = jest.fn();
const mockUseWorkoutLogDetailContextMobile = jest.fn();
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

jest.mock('@cwt/state/stores', () => ({
  useAuthStore: jest.fn(),
  useWorkoutLibraryStore: (selector: unknown) =>
    mockUseWorkoutLibraryStore(selector),
  useWorkoutDraftStore: (selector: unknown) =>
    mockUseWorkoutDraftStore(selector),
}));

describe('CancelUpdateLogConfirmationOverlay', () => {
  let isCancelUpdateLogOverlayVisible = true;
  let setIsCancelUpdateLogOverlayVisibleSpy = jest.fn();
  let setWorkoutSpy = jest.fn();
  let updateWorkoutSpy = jest.fn();
  let setModeSpy = jest.fn();
  let resetWorkoutUpdateSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    isCancelUpdateLogOverlayVisible = true;
    setIsCancelUpdateLogOverlayVisibleSpy = jest.fn();
    setWorkoutSpy = jest.fn();
    updateWorkoutSpy = jest.fn();
    setModeSpy = jest.fn();
    resetWorkoutUpdateSpy = jest.fn();

    mockUseWorkoutContextMobile.mockReturnValue({
      mobileOverlayHandlers: {
        isCancelUpdateLogOverlayVisible,
        setIsCancelUpdateLogOverlayVisible:
          setIsCancelUpdateLogOverlayVisibleSpy,
      },
    });

    mockUseWorkoutLogDetailContextMobile.mockReturnValue({
      workout: sampleWorkoutLogs[0],
      setWorkout: setWorkoutSpy,
    });

    mockUseWorkoutLibraryStore.mockImplementation((selector: any) => {
      const mockState = { updateWorkout: updateWorkoutSpy };
      return typeof selector === 'function' ? selector(mockState) : mockState;
    });

    mockUseWorkoutDraftStore.mockImplementation((selector: any) => {
      const mockState = {
        setMode: setModeSpy,
        resetWorkoutUpdate: resetWorkoutUpdateSpy,
      };
      return typeof selector === 'function' ? selector(mockState) : mockState;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders when isCancelUpdateLogOverlayVisible is true', () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    expect(screen.getByText(/Discard changes\?/i)).toBeOnTheScreen();
    expect(
      screen.getByText(
        /You have unsaved changes\. If you go back now, your edits will be lost\./i,
      ),
    ).toBeOnTheScreen();
  });

  it.skip('resets the workout draft before returning to workout details on discard', async () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Discard changes', { exact: true }));

    await waitFor(() => {
      expect(resetWorkoutUpdateSpy).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('WorkoutDetails');
    });
  });

  it.skip('returns to workout details in read mode on discard', async () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Discard changes', { exact: true }));

    await waitFor(() => {
      expect(setModeSpy).toHaveBeenCalledWith('read');
      expect(mockReplace).toHaveBeenCalledWith('WorkoutDetails');
    });
  });

  it.skip('dismisses the dialog without navigating when keeping the edits', async () => {
    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Cancel', { exact: true }));

    await waitFor(() => {
      expect(setIsCancelUpdateLogOverlayVisibleSpy).toHaveBeenCalledWith(false);
    });

    expect(mockReplace).not.toHaveBeenCalled();
    expect(resetWorkoutUpdateSpy).not.toHaveBeenCalled();
  });

  it.skip('does not update the workout when discarding changes', async () => {
    const updateWorkoutLogSpy = jest.spyOn(
      workoutsService,
      'deleteWorkoutLog', // replace with updateWorkoutLog after it is created
    );

    render(<CancelUpdateLogConfirmationOverlay />);

    fireEvent.press(screen.getByText('Discard changes', { exact: true }));

    await waitFor(() => {
      expect(resetWorkoutUpdateSpy).toHaveBeenCalled();
    });

    expect(updateWorkoutLogSpy).not.toHaveBeenCalled();
    expect(updateWorkoutSpy).not.toHaveBeenCalled();
  });
});
