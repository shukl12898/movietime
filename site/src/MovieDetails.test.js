import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
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

    it("should log an error message when there is an error fetching movie or cast data", async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject("error"));

        render(<MovieDetails data={{id: 123}} filter="movie" />);

        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("error"));
        consoleSpy.mockRestore();
      });

    it('renders overlay when title is clicked', async () => {
        const mockMovie = {
          id: 1,
          title: 'The Matrix',
          poster: '/path/to/poster',
          overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
          release_date: '1999-03-31',
          genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Science Fiction' }],
          cast: [{ name: 'Keanu Reeves' }, { name: 'Carrie-Anne Moss' }],
          crew: [{ name: 'Lana Wachowski', job: 'Director' }],
          production_companies: [{name: 'Village Roadshow Pictures'}, {name: 'Groucho II Film Partnership'}, {name: 'Silver Pictures'}],
        };

        jest.spyOn(global, 'fetch').mockResolvedValue({
                  ok: true,
                  json: () => Promise.resolve(mockMovie)
                });

          await act(async()=>{
            await render(<MovieDetails data={mockDataMovie} filter="movie"/>);
            });

        const title = screen.getByTestId('movie-title');
        fireEvent.click(title);

        const overlayElement = screen.getByTestId('overlay');
        expect(overlayElement).toBeInTheDocument();
      });

      it('removes overlay when title is clicked twice', async () => {
              const mockMovie = {
                id: 1,
                title: 'The Matrix',
                poster: '/path/to/poster',
                overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                release_date: '1999-03-31',
                genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Science Fiction' }],
                cast: [{ name: 'Keanu Reeves' }, { name: 'Carrie-Anne Moss' }],
                crew: [{ name: 'Lana Wachowski', job: 'Director' }],
                production_companies: [{name: 'Village Roadshow Pictures'}, {name: 'Groucho II Film Partnership'}, {name: 'Silver Pictures'}],
              };

              jest.spyOn(global, 'fetch').mockResolvedValue({
                        ok: true,
                        json: () => Promise.resolve(mockMovie)
                      });

                await act(async()=>{
                  await render(<MovieDetails data={mockDataMovie} filter="movie"/>);
                  });

              const title = screen.getByTestId('movie-title');
              fireEvent.click(title);

              const overlay = screen.getByTestId('overlay');
              fireEvent.click(overlay);

              const overlayElementAfterClick = screen.queryByTestId('overlay');
              expect(overlayElementAfterClick).toBeNull();
            });

});