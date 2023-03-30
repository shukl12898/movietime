import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MovieResult from './components/MovieResult';
import MovieDetails from './components/MovieDetails';
import ReactDOM from 'react-dom';

//
//describe("MovieResult", () => {
//    test('should render a div with a key of index for each movie in MovieResult', () => {
//        const props = {
//            movies: [
//                { id: 1, title: 'Movie 1' },
//                { id: 2, title: 'Movie 2' },
//                { id: 3, title: 'Movie 3' }
//            ],
//            numResults: 2
//        };
//
//        const container = document.createElement('div');
//        ReactDOM.render(<MovieResult {...props} />, container);
//
//        const divs = container.querySelectorAll('div');
//        divs.forEach((div, index) => {
//            expect(div.getAttribute('key')).toBe(`${index}`);
//        });
//    });
//});






