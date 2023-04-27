import React from 'react';
import { render , waitFor } from '@testing-library/react';
import SearchBackend from './components/SearchBackend';

describe('SearchBackend', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                // your test data
            }),
        }));
    });

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });


    it('should call fetch with the correct URL', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
            fetchData:true

        };
        render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_movie/TestQuery/0/0');
    });

    it('should call fetch with the correct URL when filter is an array with length > 1', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie', 'tv'],
            fetchData: true
        };
        render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_multi/TestQuery/movie,tv/0/0');
    });

    it('should call fetch with the correct URL when startYear and endYear are provided', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
            startYear: '2000',
            endYear: '2020',
            fetchData: true
        };
        render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_movie/TestQuery/2000/2020');
    });

    it('should return null when movies is null', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
            fetchData: true
        };
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(null),
        }));
        const { container } = render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_movie/TestQuery/0/0');
        expect(container.firstChild).toBeNull();
    });


    it('should log an error when fetch fails', async () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
            fetchData: true
        };
        global.fetch = jest.fn(() => Promise.reject('Error'));
        const consoleSpy = jest.spyOn(console, 'error');
        render(<SearchBackend {...props} />);
        expect(global.fetch).toHaveBeenCalledWith('search_movie/TestQuery/0/0');
        expect(global.fetch).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Error'));
    });

    it('should call onFetchDataChange with false after movies are assigned', async () => {
        const onFetchDataChangeSpy = jest.fn();
        const handleSearchSpy = jest.fn();
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
            fetchData: true,
            handleSearch: handleSearchSpy,
            onFetchDataChange: onFetchDataChangeSpy
        };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        movieIDs: [1, 2, 3],
                    }),
            })
        );

        render(<SearchBackend {...props} />);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(fetch).toHaveBeenCalledWith('search_movie/TestQuery/0/0');

        await waitFor(() => expect(handleSearchSpy).toHaveBeenCalledTimes(1));
        expect(handleSearchSpy).toHaveBeenCalledWith([1, 2, 3]);

        expect(onFetchDataChangeSpy).toHaveBeenCalledTimes(1);
        expect(onFetchDataChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should not call fetch when fetchData is false', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
            fetchData: false,
        };
        render(<SearchBackend {...props} />);
        expect(fetch).not.toHaveBeenCalled();
    });

});
