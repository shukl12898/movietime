import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./pages/Search";
import { BrowserRouter } from "react-router-dom";
import SearchBox from './components/SearchBox'
import SearchFilter from './components/SearchFilter';
test("full app rendering", async () => {
    render(<Search />, { wrapper: BrowserRouter });

    // verify page content for default route
    expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
});

describe('SearchBox', ()=>{
    test('renders SearchBox component', () => {
        render(<SearchBox />);
    });
    
    test('submitting search form triggers onSearch function with current query', () => {
        const onSearchMock = jest.fn();
        const { getByTestId } = render(<SearchBox onSearch={onSearchMock} />);
        const searchInput = getByTestId('search-input');
        const searchForm = getByTestId('search-form');
        const query = 'example query';
        fireEvent.change(searchInput, { target: { value: query } });
        fireEvent.submit(searchForm);

        expect(onSearchMock).toHaveBeenCalledTimes(1);
        expect(onSearchMock).toHaveBeenCalledWith(query);

    });
    
    test('changing search input updates current query state', () => {
        const { getByTestId } = render(<SearchBox />);
        const searchInput = getByTestId('search-input');
        const query = 'example query';

        fireEvent.change(searchInput, { target: { value: query } });

        expect(searchInput.value).toBe(query);
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

