import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MovieDetails from './components/MovieDetails';

describe('MovieDetails component', () => {
  const mockDataMovie = {
    id: 1,
    original_title: 'The Matrix',
    release_date: 1989,
    genres: [{name: "Comedy"}, {name: "Drama"}],
    overview: "A good movie",
    production_companies: [{name: "M.G.D Film"}],
  };

  const mockDataPerson = {
    known_for: [{id: 1, id: 2, id:3}],
    original_title: 'The Matrix',
  };

  const mockDataKeyword = {
      id: 1,
      original_title: 'The Matrix',
    };

  const mockCastData = [
    { id: 1, cast: [{ name: 'Keanu Reeves' }, { name: 'Carrie-Anne Moss' }], crew: [{ name: 'Lana Wachowski', job: 'Director' }] }
  ];

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render movie details with movie filter', async () => {

    jest.spyOn(global, 'fetch').mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockDataMovie)
        });

  await act(async()=>{
    await render(<MovieDetails data={mockDataMovie} filter="movie" />);
    });

    expect(screen.getByText(mockDataMovie.original_title)).toBeInTheDocument();
  });

  it('should render movie details with actor/actress filter', async () => {

      jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockDataPerson)
          });

    await act(async()=>{
      await render(<MovieDetails data={mockDataPerson} filter="person" />);
      });

      expect(screen.getByText(mockDataPerson.original_title)).toBeInTheDocument();
    });

    it('should render movie details with keyword filter', async () => {

          jest.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockDataMovie)
              });

        await act(async()=>{
          await render(<MovieDetails data={mockDataMovie} filter="keyword" />);
          });

          expect(screen.getByText(mockDataMovie.original_title)).toBeInTheDocument();
        });

  it('should show the movie details when a movie is selected', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockDataMovie)
    });


    await act(async()=>{
    await render(<MovieDetails data={mockDataMovie} filter="movie" />);
    });

    const movieTitle = screen.getByText(mockDataMovie.original_title);

    act(()=>{
        movieTitle.click();
    })

    expect(screen.getByText(mockDataMovie.original_title)).toBeInTheDocument();
    expect(screen.getByText(mockDataMovie.production_companies[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockDataMovie.genres[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockDataMovie.release_date)).toBeInTheDocument();
    expect(screen.getByText(mockDataMovie.overview)).toBeInTheDocument();

  });
});