import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MultipleWatchlists from './components/MultipleWatchlists';

describe('MultipleWatchlists component', () => {

const mockMultiList = {
"watchlists" : [{
	"user_id": 1,
	"watchlistName": "Hi",
	"moviesInW": [
		"FightOn",
		"USC"
	],
	"isPublic": 1
}, {
   	"user_id": 1,
   	"watchlistName": "Hello",
    "moviesInW": [{
        title: 'Flight',
      }, {
        title: 'Train',
      }, {
        title: 'Plane',
      }, {
        title: 'Boat',
      }],
   	"isPublic": 1
   }]
}



  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render the saved watchlists of user_id 1', async () => {

    jest.spyOn(global, 'fetch').mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockMultiList)
        });

  await act(async()=>{
    await render(<MultipleWatchlists watchlistsArr={mockMultiList} />);
    });

    expect(screen.getByText(mockMultiList.watchlistName)).toBeInTheDocument();
  });

});