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
        };
        render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_movie/TestQuery');
    });

    it('should call fetch with the correct URL when filter is an array with length > 1', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie', 'tv'],
        };
        render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_multi/TestQuery/movie,tv');
    });

    it('should return null when movies is null', () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
        };
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(null),
        }));
        const { container } = render(<SearchBackend {...props} />);
        expect(fetch).toHaveBeenCalledWith('search_movie/TestQuery');
        expect(container.firstChild).toBeNull();
    });

    it('should log an error when fetch fails', async () => {
        const props = {
            query: 'TestQuery',
            filters: ['movie'],
        };
        global.fetch = jest.fn(() => Promise.reject('Error'));
        const consoleSpy = jest.spyOn(console, 'error');
        render(<SearchBackend {...props} />);
        expect(global.fetch).toHaveBeenCalledWith('search_movie/TestQuery');
        expect(global.fetch).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Error'));
    });

});
