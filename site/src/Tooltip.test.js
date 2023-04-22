import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from './components/Tooltip';

describe('Tooltip component', () => {
  test('renders tooltip with given text and children', () => {
    const tooltipText = 'Sample tooltip text';
    const buttonText = 'Hover me!';

    render(
      <Tooltip text={tooltipText}>
        <button>{buttonText}</button>
      </Tooltip>
    );

    // Check if tooltip text is rendered
    expect(screen.getByText(tooltipText)).toBeInTheDocument();

    // Check if button child is rendered
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });
});
