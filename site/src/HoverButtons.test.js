import React from 'react';
import { render, fireEvent, screen, waitFor} from '@testing-library/react';
import HoverButtons from './components/HoverButtons';

describe('HoverButtons component', () => {
  test('should open the AlertDialog when "Ticket" button is clicked', () => {
    render(<HoverButtons />);

    expect(screen.queryByText('Free tickets!')).toBeNull();

    const ticket = screen.getByLabelText('Ticket');
    fireEvent.click(ticket);

    expect(screen.getByText('Purchase')).toBeInTheDocument();
  });

  test('should redirect to external website when "Purchase" button is clicked', () => {
    render(<HoverButtons title="The Avengers" />);

    const ticket = screen.getByLabelText('Ticket');
    fireEvent.click(ticket);

    const purchaseButton = screen.getByText('Purchase');
    fireEvent.click(purchaseButton);

    waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('https://www.regmovies.com/search?query=The Avengers', '_blank');
    });
  });

});
