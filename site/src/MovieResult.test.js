import React from 'react';
import { render, screen, act } from '@testing-library/react';
import MovieResult from './components/MovieResult';
import MovieDetails from './components/MovieDetails';

describe('MovieResult component', () => {
  it('should render a MovieDetails component for each movie in the props', async () => {
    const mockDataMovie = {
      id: 1,
      original_title: 'The Matrix',
    };
    const props = {
      movies: [mockDataMovie],
      numResults: 1,
      filter: 'movie'
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockDataMovie)
    });

    await act(async () => {
      await render(<MovieResult {...props} />);
    });

    expect(screen.queryByText('The Matrix')).toBeInTheDocument();
    const movieDetailsList = screen.getAllByTestId('movie-title');
    expect(movieDetailsList).toHaveLength(1);
  });
});
