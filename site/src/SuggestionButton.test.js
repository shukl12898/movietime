import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuggestionButton from './components/SuggestionButton';

// Helper function to wrap the component with BrowserRouter since it uses useNavigate hook
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('SuggestionButton component', () => {
  test('renders the component', () => {
    renderWithRouter(<SuggestionButton />);
    expect(screen.getByText('How many movies do you want to be suggested for you?')).toBeInTheDocument();

    expect(screen.getByRole('spinbutton', { name: 'How many movies do you want to be suggested for you?' })).toBeInTheDocument();

    expect(screen.getByText('Generate Suggestions')).toBeInTheDocument();
  });

  test('shows an error message when submitting an empty input', () => {
    renderWithRouter(<SuggestionButton />);
    const submitButton = screen.getByText('Generate Suggestions');
    fireEvent.click(submitButton);
    expect(screen.getByText('Please enter a number')).toBeInTheDocument();
  });

  test('redirects to suggestions page when input is valid', () => {
    renderWithRouter(<SuggestionButton />);

    expect(screen.getByRole('spinbutton', { name: 'How many movies do you want to be suggested for you?' })).toBeInTheDocument();

    const submitButton = screen.getByText('Generate Suggestions');
    const inputField = screen.getByRole('spinbutton', { name: 'How many movies do you want to be suggested for you?' });
    fireEvent.change(inputField, { target: { value: '5' } });
    fireEvent.click(submitButton);

    // Since we can't directly test the navigate function, we check if the URL was updated
    expect(window.location.pathname).toEqual('/suggestions/5');
  });
});
