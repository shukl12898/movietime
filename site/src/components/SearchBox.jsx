import React from 'react';
import { Input } from '@chakra-ui/react'

// functional component
const SearchBox = (props) => {
    return (
        <div key = "0">
            <form>
                <Input
                    type="text"
                    id="searchBar"
                    placeholder = "Search Here..."
                    value = {props.value}
                    onChange = {(event)=>props.setQuery(event.target.value)}
                    variant='filled'
                    width='auto'
                ></Input>

            </form>
        </div>
    )
}
export default SearchBox;