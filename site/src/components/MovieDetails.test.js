import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

describe('MovieDetails', () => {
  test('renders the movie title', () => {
    render(<MovieDetails movieID="12345" />);
    expect(screen.getByText(/Details here/)).toBeInTheDocument();
  });

  test('shows movie details when title is clicked', async () => {
    const mockMovieDetails = {
      original_title: 'Test Movie',
      release_date: '2021-01-01',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      poster_path: '/test-poster.jpg',
      overview: 'This is a test movie.',
      production_companies: [{ name: 'Test Company' }],
    };
    const mockCastDetails = {
      cast: [{ name: 'Test Actor 1' }, { name: 'Test Actor 2' }],
      crew: [{ name: 'Test Director', job: 'Director' }],
    };
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: () => mockMovieDetails })
      .mockResolvedValueOnce({ json: () => mockCastDetails });

    render(<MovieDetails movieID="12345" />);
    fireEvent.click(screen.getByText(/Details here/));
    await screen.findByText(/Test Movie/);

    expect(screen.getByText(/Test Movie/)).toBeInTheDocument();
    expect(screen.getByText(/2021/)).toBeInTheDocument();
    expect(screen.getByText(/Action, Adventure/)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Movie/)).toBeInTheDocument();
    expect(screen.getByText(/Test Actor 1/)).toBeInTheDocument();
    expect(screen.getByText(/Test Actor 2/)).toBeInTheDocument();
    expect(screen.getByText(/Test Director/)).toBeInTheDocument();
    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
    expect(screen.getByText(/This is a test movie/)).toBeInTheDocument();
  });

  // Add more test cases here as needed to achieve full coverage
});
