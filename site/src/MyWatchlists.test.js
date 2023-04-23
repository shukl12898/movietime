import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MyWatchlists from './MyWatchlists';

describe('MyWatchlists', () => {
  test('Clicking "Add new list" button should open a form to create a new list', () => {
    const { getByText, getByTestId } = render(<MyWatchlists />);

    // Check that the "Add new list" button is present
    const addButton = getByText('Add new list');
    expect(addButton).toBeInTheDocument();

    // Check that the form to create a new list is initially hidden
    const form = getByTestId('new-list-form');
    expect(form).not.toBeVisible();

    // Click the "Add new list" button
    fireEvent.click(addButton);

    // Check that the form to create a new list is now visible
    expect(form).toBeVisible();

    // Fill in the form and submit it
    // (This assumes that the form has input fields and a submit button)
    const nameInput = getByTestId('list-name-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'My New List' } });
    fireEvent.click(submitButton);

    // Check that the new list has been added to the page
    const newList = getByText('My New List');
    expect(newList).toBeInTheDocument();
  });
});
