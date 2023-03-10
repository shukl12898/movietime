import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import MovieDetails from './components/MovieDetails';
import userEvent from "@testing-library/user-event";

describe('MovieDetails', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    test('should fetch movie details and cast details', async () => {
        const mockMovieDetails = { title: 'Movie1' };
        const mockCastDetails = { cast: [{ name: 'Actor1' }, { name: 'Actor2' }] };
        fetch.mockResponses(
            [JSON.stringify(mockMovieDetails), { status: 200 }],
            [JSON.stringify(mockCastDetails), { status: 200 }]
        );
        const props = { movieID: '1' };
        render(<MovieDetails {...props} />);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(fetch).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/${props.movieID}?api_key=f0a2d3c27e0522ee834ad2e76ceeebb1`);
            expect(fetch).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/${props.movieID}/credits?api_key=f0a2d3c27e0522ee834ad2e76ceeebb1`);
            expect(screen.getByText(mockMovieDetails.title)).toBeInTheDocument();
            expect(screen.getByText(mockCastDetails.cast[0].name)).toBeInTheDocument();
            expect(screen.getByText(mockCastDetails.cast[1].name)).toBeInTheDocument();
        });
    });

    test('should handle fetch error', async () => {
        fetch.mockRejectOnce(new Error('Fetch error'));
        const props = { movieID: '1' };
        render(<MovieDetails {...props} />);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(fetch).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/${props.movieID}?api_key=f0a2d3c27e0522ee834ad2e76ceeebb1`);
            expect(fetch).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/${props.movieID}/credits?api_key=f0a2d3c27e0522ee834ad2e76ceeebb1`);
            expect(screen.queryByText('Movie details not available')).not.toBeInTheDocument();
            expect(screen.queryByText('Cast details not available')).not.toBeInTheDocument();
        });
    });

    // test('should show overlay when showDetails is called', async () => {
    //     const initialState = {showOverlay: true };
    //
    //     render(<MovieDetails movieID='123' />, {initialState});
    //
    //     const showDetailsButton = screen.getByTestId('movieDetails');
    //     await userEvent.click(showDetailsButton);
    //     expect(screen.getByTestId('movieOverlay')).toBeInTheDocument();
    // });

    test('should show overlay when showDetails is called', async () => {
        const initialState = { showOverlay: true };

        const { getByTestId } = render(<MovieDetails movieID='123' />, { initialState });

        const showDetailsButton = getByTestId('movieDetails');
        await userEvent.click(showDetailsButton);
        expect(screen.getByTestId('movieOverlay')).toBeInTheDocument();
    });

    // test('hideDetails should set showOverlay to false', () => {
    //     const { getByTestId } = render(<MovieDetails />);
    //     const overlay = getByTestId('movieOverlay');
    //     fireEvent.click(overlay);
    //     expect(overlay).toBeInTheDocument();
    //     hideDetails();
    //     expect(overlay).not.toBeInTheDocument();
    // });

    // test('hideDetails should be called when overlay is clicked', () => {
    //     // Set the initial state of showOverlay to true
    //     const initialState = { showOverlay: true };
    //
    //     render(<MovieDetails movieID='123' />, { initialState });
    //
    //     expect(screen.getByTestId('movieOverlay')).toBeInTheDocument();
    //
    //     // Click on the overlay
    //     userEvent.click(screen.getByTestId('movieOverlay'));
    //
    //     expect(hideDetails()).toHaveBeenCalled();
    // });

});
