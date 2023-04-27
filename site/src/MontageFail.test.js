import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Montage from './pages/Montage';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: null,
  }),
}));

describe('Montage Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ montageImages: [] }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

     it("should return null when location state does not exist", () => {
       const { container } = render(<Montage />);
       expect(container.firstChild).toBeNull();
     });


});
