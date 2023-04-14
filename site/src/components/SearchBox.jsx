import React, {useState} from 'react';

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
                <input
                    type="text"
                    id="searchBar"
                    placeholder = "Search here..."
                    value = {currentQuery}
                    onChange = {(event) => setCurrentQuery(event.target.value)}
                    data-testid="search-input"
                ></input>
                <button type = "submit">Search</button>
            </form >
        </div>
    )
}
export default SearchBox;