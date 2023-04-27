import React from 'react';
import { render, fireEvent, screen, waitFor, getByTestId, waitForElementToBeRemoved } from '@testing-library/react';
import HoverButtons from './components/HoverButtons';

describe('HoverButtons', () => {
  const movieDetails = { id: 1, title: 'Test Movie' };
  const consoleLogSpy = jest.spyOn(console, 'log');

  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.spyOn(window, 'fetch');
    fetchMock.mockResolvedValue({ text: () => Promise.resolve('OK') });
    sessionStorage.clear();
    consoleLogSpy.mockReset();
  });

  afterEach(() => {
    fetchMock.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('renders all the required buttons', () => {
    render(<HoverButtons movieDetails={movieDetails} />);
    expect(screen.getByLabelText('Like')).toBeInTheDocument();
    expect(screen.getByLabelText('Comment')).toBeInTheDocument();
    expect(screen.getByLabelText('Ticket')).toBeInTheDocument();
  });

  it('opens the ticket purchase confirmation dialog', () => {
    render(<HoverButtons movieDetails={movieDetails} />);
    const ticketButton = screen.getByLabelText('Ticket');
    fireEvent.click(ticketButton);
    expect(screen.getByText('Buy tickets!')).toBeInTheDocument();
  });

  it('redirects to ticket purchase page on confirmation', () => {
    const openMock = jest.spyOn(window, 'open');
    openMock.mockImplementation(() => {});
    render(<HoverButtons movieDetails={movieDetails} />);
    const ticketButton = screen.getByLabelText('Ticket');
    fireEvent.click(ticketButton);
    const purchaseButton = screen.getByText('Purchase');
    fireEvent.click(purchaseButton);
    expect(openMock).toHaveBeenCalledWith('https://www.regmovies.com/search?query=Test Movie', '_blank');
    openMock.mockRestore();
  });

  it('shows add to list modal when add button is clicked', () => {
    render(<HoverButtons movieDetails={movieDetails} />);
    const addButton = screen.getByLabelText('Comment');
    fireEvent.click(addButton);
    expect(screen.getByText('Add Test Movie to a new list?')).toBeInTheDocument();
  });

  it('adds movie to the selected watchlist', async () => {
    const response = { watchlists: [{ listId: 1, listName: 'Test List' }] };
    fetchMock.mockResolvedValue({ json: () => Promise.resolve(response) });
    render(<HoverButtons movieDetails={movieDetails} />);
    const addButton = screen.getByLabelText('Comment');
    fireEvent.click(addButton);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    const addToListButton = screen.getByText('Add');
    fireEvent.click(addToListButton);
    expect(fetchMock).toHaveBeenCalledWith('/api/watchlists/insertMovie=/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: null }),
    });
  });

  it('shows create new list modal when new list is selected', () => {
    render(<HoverButtons movieDetails={movieDetails} />);
    const addButton = screen.getByLabelText('Comment');
    fireEvent.click(addButton);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'new' } });
    expect(screen.getByText('Create a New List')).toBeInTheDocument();
  });

    it('fetches watchlists and displays them when storedId is present', async () => {
        const response = { watchlists: [{ listId: 1, listName: 'Test List 1' }, { listId: 2, listName: 'Test List 2' }] };
        fetchMock.mockResolvedValue({ json: () => Promise.resolve(response) });
        sessionStorage.setItem('userId', '123');
        render(<HoverButtons movieDetails={movieDetails} />);
        const addButton = screen.getByLabelText('Comment');
        fireEvent.click(addButton);
        expect(fetchMock).toHaveBeenCalledWith('/api/getAllLists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: '123',
          }),
        });
        expect(await screen.findByText('Test List 1')).toBeInTheDocument();
        expect(await screen.findByText('Test List 2')).toBeInTheDocument();
      });

      it('should not display the modal by default', () => {
        render(<HoverButtons movieDetails={{ title: 'Movie Title', id: 123 }} />);
        const modal = screen.queryByTestId('modal');
        expect(modal).not.toBeInTheDocument();
      });

    it('should show and display the modal according to showOverlay', async () => {
      render(<HoverButtons movieDetails={{ title: 'Movie Title', id: 123 }} />);
      const addButton = screen.getByLabelText('Comment');
      fireEvent.click(addButton);
      const modal = screen.getByTestId('close-modal-button');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
      await waitForElementToBeRemoved(() => screen.queryByTestId('close-modal-button'));
      expect(screen.queryByTestId('close-modal-button')).not.toBeInTheDocument();
    });

});
