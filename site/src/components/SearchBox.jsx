import React from 'react';

// functional component
const SearchBox = (props) => {
    return (
        <div key = "0">
            <form>
                <input
                    type="text"
                    id="searchBar"
                    placeholder = "Enter search term..."
                    value = {props.value}
                    onChange = {(event)=>props.setQuery(event.target.value)}

                ></input>

            </form>
        </div>
    )
}
export default SearchBox;