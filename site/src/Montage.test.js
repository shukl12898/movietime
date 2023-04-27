import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Montage from './pages/Montage';

describe('Montage', () => {
  it('renders null when location state does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/montage']}>
        <Routes>
          <Route path="/montage" element={<Montage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByTestId('picture-grid')).not.toBeInTheDocument();
  });

  it('fetches the images when movies is defined', async () => {
    const testMovies = {
      movies: '550',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ montageImages: [{ url: 'http://example.com/image1.jpg', title: 'Image 1' }] }),
      })
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: '/montage', state: testMovies }]}>
        <Routes>
          <Route path="/montage" element={<Montage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/images/550');
      expect(screen.getByTestId('picture-grid')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    const testMovies = {
      movies: '550',
    };

    global.fetch = jest.fn(() => Promise.resolve({ status: 400 }));

    render(
      <MemoryRouter initialEntries={[{ pathname: '/montage', state: testMovies }]}>
        <Routes>
          <Route path="/montage" element={<Montage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/images/550');
      expect(screen.queryByTestId('picture-grid')).not.toBeInTheDocument();
    });
  });

});
