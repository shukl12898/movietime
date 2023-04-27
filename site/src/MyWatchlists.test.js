import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateNewList from './components/CreateNewList'
import MyWatchlists from "./pages/MyWatchlists";

const mockFetch = () =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/testposter.jpg",
            overview: "Test movie overview",
          },
        ],
      }),
  });

test("full app rendering", async () => {
    render(<MyWatchlists />, { wrapper: BrowserRouter });

    // verify page content for default route
    expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
});

describe('MyWatchlists Page', ()=>{
    test('renders CreateNewList component', () => {
        render(<CreateNewList />);
        expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
    });

    test('Generating Movies Shown', () => {
        render(< />)

        expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
    });

});