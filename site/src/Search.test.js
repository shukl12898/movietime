import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./pages/Search";
import { BrowserRouter } from "react-router-dom";
import SearchBox from './components/SearchBox'
import SearchFilter from './components/SearchFilter';
import YearPicker from './components/YearPicker';

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
        const onSubmittedMock = jest.fn();
        const { getByTestId } = render(<SearchBox onSearch={onSearchMock} onSubmitted={onSubmittedMock} />);
        const searchInput = getByTestId('search-input');
        const searchForm = getByTestId('search-form');
        const query = 'example query';
        fireEvent.change(searchInput, { target: { value: query } });
        fireEvent.submit(searchForm);

        expect(onSearchMock).toHaveBeenCalledTimes(1);
        expect(onSearchMock).toHaveBeenCalledWith(query);
        expect(onSubmittedMock).toHaveBeenCalledTimes(1);
        expect(onSubmittedMock).toHaveBeenCalledWith(true);

    });
    
    test('changing search input updates current query state', () => {
        const { getByTestId } = render(<SearchBox />);
        const searchInput = getByTestId('search-input');
        const query = 'example query';

        fireEvent.change(searchInput, { target: { value: query } });

        expect(searchInput.value).toBe(query);
    });

});

describe("SearchFilter component", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    test("renders all options", () => {
        const { getByText } = render(<SearchFilter options={options} />);
        options.forEach((option) => {
            const labelElement = getByText(option.label);
            expect(labelElement).toBeInTheDocument();
        });
    });

    test("selects options", () => {
        const onSelect = jest.fn();
        const { getByLabelText } = render(
            <SearchFilter options={options} onSelect={onSelect} />
        );
        const optionValues = options.map((option) => option.value);

        fireEvent.click(getByLabelText(options[0].label));
        expect(onSelect).toHaveBeenCalledWith([optionValues[0]]);

        fireEvent.click(getByLabelText(options[1].label));
        expect(onSelect).toHaveBeenCalledWith([optionValues[0], optionValues[1]]);

        fireEvent.click(getByLabelText(options[2].label));
        expect(onSelect).toHaveBeenCalledWith(optionValues);
    });
});

describe('YearPicker', () => {
    test('renders correctly', () => {
        const { getByPlaceholderText } = render(<YearPicker />);
        expect(getByPlaceholderText('Start')).toBeInTheDocument();
        expect(getByPlaceholderText('End')).toBeInTheDocument();
    });

    test('handles start year selection', () => {
        const onStartYearSelect = jest.fn();
        const { getByPlaceholderText } = render(
            <YearPicker onStartYearSelect={onStartYearSelect} />
        );
        const startYearInput = getByPlaceholderText('Start');
        fireEvent.change(startYearInput, { target: { value: '2020' } });
        expect(startYearInput.value).toBe('2020');
        expect(onStartYearSelect).toHaveBeenCalledWith('2020');
    });

    test('handles end year selection', () => {
        const onEndYearSelect = jest.fn();
        const { getByPlaceholderText } = render(
            <YearPicker onEndYearSelect={onEndYearSelect} />
        );
        const endYearInput = getByPlaceholderText('End');
        fireEvent.change(endYearInput, { target: { value: '2022' } });
        expect(endYearInput.value).toBe('2022');
        expect(onEndYearSelect).toHaveBeenCalledWith('2022');
    });
});




