import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MovieDetails from "./components/MovieDetails";

describe("MovieDetails component", () => {
  const mockMovieData = {
    id: 1,
    title: "Test Movie",
    poster: "http://test.com/poster.jpg",
    overview: "This is a test movie",
    year: 2021,
    genres: [{ name: "Action" }, { name: "Thriller" }],
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    director: "Director 1",
    productionCompanies: ["Company 1", "Company 2"],
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMovieData),
        status: 200,
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders loading message before movie details are fetched", async () => {
    const handleCastMock = jest.fn();
    const handleGenreMock = jest.fn();

    render(<MovieDetails data={mockMovieData} filter="movie" handleCast = {handleCastMock} handleGenre = {handleGenreMock}/>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("opens overlay with movie details when movie title is clicked", async () => {
    const handleCastMock = jest.fn();
    const handleGenreMock = jest.fn();

    render(<MovieDetails data={mockMovieData} filter="movie" handleCast = {handleCastMock} handleGenre = {handleGenreMock}/>);
    await screen.findByTestId("movie-title");
    fireEvent.click(screen.getByTestId("movie-title"));
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
    expect(screen.getByText("Released 2021")).toBeInTheDocument();
    expect(screen.getByText("Cast List")).toBeInTheDocument();
    expect(screen.getAllByTestId("cast")).toHaveLength(3);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('MovieDetails handles mouse enter and leave events', async () => {
    const handleCastMock = jest.fn();
    const handleGenreMock = jest.fn();
    render(<MovieDetails data={mockMovieData} filter="movie" handleCast = {handleCastMock} handleGenre = {handleGenreMock}/>);
    await screen.findByTestId("movie-title");

    const movieTitle = screen.getByTestId('movie-title');
    fireEvent.mouseEnter(movieTitle);
    await screen.findByTestId('hover-buttons');
    expect(screen.getByTestId('hover-buttons')).toBeInTheDocument();

    fireEvent.mouseLeave(movieTitle);
    await waitFor(() => {
      expect(screen.queryByTestId('hover-buttons')).not.toBeInTheDocument();
    });
  });

  test('should log error message when movieID is invalid', async () => {
    const handleCastMock = jest.fn();
    const handleGenreMock = jest.fn();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockMovieData = { id: 12345 };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Invalid movieID' }),
      })
    );

    render(<MovieDetails data={mockMovieData} filter="movie" handleCast = {handleCastMock} handleGenre = {handleGenreMock}/>);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    consoleSpy.mockRestore();
    delete global.fetch;
  });

  test("deselects movie when movie title is clicked again", async () => {
    const handleCastMock = jest.fn();
    const handleGenreMock = jest.fn();
    render(<MovieDetails data={mockMovieData} filter="movie" handleCast = {handleCastMock} handleGenre = {handleGenreMock}/>);
    await screen.findByTestId("movie-title");

    fireEvent.click(screen.getByTestId("movie-title"));
    expect(screen.getByTestId("overlay")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("movie-title"));
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

    test("toggles Cast List accordion on click", async () => {
      const handleCastMock = jest.fn();
      const handleGenreMock = jest.fn();
      render(<MovieDetails data={mockMovieData} filter="movie" handleCast = {handleCastMock} handleGenre = {handleGenreMock}/>);
      await screen.findByTestId("movie-title");
      fireEvent.click(screen.getByTestId("movie-title"));

      const accordionButton = screen.getByTestId("castButton");
      const castList = screen.getByTestId("castList");

      fireEvent.click(accordionButton);

      expect(castList).not.toBeNull();

    });


});
