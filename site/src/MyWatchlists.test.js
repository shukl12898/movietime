import React from 'react';
import { render, screen, act } from '@testing-library/react';
import MyWatchlists from './pages/MyWatchlists';
import { BrowserRouter } from "react-router-dom";
import {EditIcon} from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";

test("full app rendering", async () => {
    render(<MyWatchlists />, { wrapper: BrowserRouter });

    // verify page content for default route
    expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
});

test('displays watchlists', async () => {
  const mockLists = [
    {
      listId: 1,
      listName: 'List 1',
      userId: 123,
      isPrivate: true,
      movies: [1, 2, 3],
    },
    {
      listId: 2,
      listName: 'List 2',
      userId: 123,
      isPrivate: false,
      movies: [4, 5, 6],
    },
  ];

    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockLists),
          status: 200,
        })
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

  jest.spyOn(global, 'fetch').mockImplementation(
    Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true
    })
  );


  await act(async () => {
    render(<MyWatchlists />);

  });

  expect(screen.getByText('List 1')).toBeInTheDocument();
  expect(screen.getByText('List 2')).toBeInTheDocument();
});
