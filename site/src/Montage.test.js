import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Montage from './pages/Montage';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: { movies: 550 },
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

  it('renders the component', async () => {
    const { getByTestId } = render(<Montage />);
    expect(getByTestId('navbar')).toBeInTheDocument();
  });

  it('fetches the images when movies is defined', async () => {
    render(<Montage />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/images/550');
      expect(screen.getByTestId('picture-grid')).toBeInTheDocument();
    });
  });

 it('should log an error message if the fetch request fails', async () => {
     jest.spyOn(console, 'error').mockImplementation(() => {});
     jest.spyOn(global, 'fetch').mockRejectedValue(new Error('An error occurred'));

     const { container } = render(<Montage />);

     await waitFor(() => {
       expect(console.error).toHaveBeenCalledWith(new Error('An error occurred'));
     });
   });

});
