import React from 'react';
import { render, fireEvent, screen, waitFor} from '@testing-library/react';
import HoverButtons from './components/HoverButtons';

describe('HoverButtons component', () => {
  test('should open the AlertDialog when "Ticket" button is clicked', () => {
    render(<HoverButtons />);

    expect(screen.queryByText('Free tickets!')).toBeNull();

    const shareButton = screen.getByLabelText('Ticket');
    fireEvent.click(shareButton);

    expect(screen.getByText('Free tickets!')).toBeInTheDocument();
  });
});
