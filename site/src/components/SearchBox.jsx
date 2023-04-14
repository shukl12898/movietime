import React, {useState} from 'react';
import { Input} from '@chakra-ui/react'


// functional component
const SearchBox = ({onSearch}) => {
    const [currentQuery, setCurrentQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(currentQuery);
    }

    return (
        <div key = "0">
            <form onSubmit={handleSubmit} data-testid="search-form">
                <Input
                    type="text"
                    id="searchBar"
                    placeholder = "Search here..."
                    value = {currentQuery}
                    onChange = {(event) => setCurrentQuery(event.target.value)}
                    variant='filled'
                    width='auto'
                    data-testid="search-input"
                ></Input>
                <button type="submit">Search</button>
            </form >
        </div>
    )
}
export default SearchBox;