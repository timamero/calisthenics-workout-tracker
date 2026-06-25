import { render, screen } from '../../../utils/testUtils';

import DeleteLogConfirmationOverlay from '../DeleteLogConfirmationOverlay';

// --- Mocks ---
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@cwt/hooks', () => ({
  useWorkoutContextMobile: () => ({
    mobileOverlayHandlers: {
      isDeleteLogOverlayVisible: true,
    },
  }),
  useWorkoutLogDetailContextMobile: () => ({
    workout: { id: '1' },
  }),
}));

jest.mock('@cwt/state/stores', () => ({
  useAuthStore: jest.fn(),
  useWorkoutLibraryStore: jest.fn(),
  useWorkoutDraftStore: jest.fn(),
}));

describe('DeleteConfirmationOverlay', () => {
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
