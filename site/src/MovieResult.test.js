import React from 'react';
import { render } from '@testing-library/react';
import MovieResult from './components/MovieResult';

jest.mock('./components/MovieDetails', () => {
  return function DummyMovieDetails(props) {
    return (
      <div data-testid="movie-details">
        <span>{props.data.title}</span>
        <span>{props.filter}</span>
      </div>
    );
  };
});

describe('MovieResult', () => {
  it('renders movie titles and filters for the first n movies in the list', async () => {
    const movies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ];
    const numResults = 1;
    const filter = 'Action';

    const { getByTestId, queryByText } = render(
      <MovieResult movies={movies} numResults={numResults} filter={filter} />
    );

    // Ensure that the first two movie titles are displayed
    expect(getByTestId('movie-details')).toHaveTextContent('Movie 1');

    // Ensure that the third movie title is not displayed
    expect(queryByText('Movie 2')).not.toBeInTheDocument();

    // Ensure that the filter prop is passed to the MovieDetails component
    expect(getByTestId('movie-details')).toHaveTextContent('Action');
  });
});
