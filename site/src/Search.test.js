import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SearchBox from './components/SearchBox'
import SearchFilter from './components/SearchFilter';
test("full app rendering", async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: BrowserRouter });

    // verify page content for default route
    expect(screen.getByText(/Search/)).toBeInTheDocument();
});

describe('SearchBox', ()=>{
    const defaultProps = {
        value: '',
        setQuery: jest.fn(),
    };

    it('should update the value of the input element when props change', () => {
        const { getByPlaceholderText, rerender } = render(<SearchBox value="" setQuery={() => {}} />);
        expect(getByPlaceholderText('Enter search term...').value).toBe('');
        rerender(<SearchBox value="test" setQuery={() => {}} />);
        expect(getByPlaceholderText('Enter search term...').value).toBe('test');
    });

    it('should call the setQuery function with the input value when input changes', () => {
        const setQueryMock = jest.fn();
        const { getByPlaceholderText } = render(<SearchBox value="" setQuery={setQueryMock} />);
        fireEvent.change(getByPlaceholderText('Enter search term...'), { target: { value: 'test' } });
        expect(setQueryMock).toHaveBeenCalledWith('test');
    });
});

describe('SearchFilter', () => {
    it('sets selected and calls onSelect', () => {
        const options = [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },];
        const onSelect = jest.fn();
        render(<SearchFilter options={options} onSelect={onSelect} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'option2' } });
        expect(onSelect).toHaveBeenCalledWith('option2');
    });
});

