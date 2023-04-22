import React, {useState} from 'react';
import { Select } from '@chakra-ui/react'

// functional component
const SearchFilter = ({options, onSelect}) => {
    const [selected, setSelected] = useState("");

    const handleSelect = (event) => {
        const selectedOption = event.target.value;
        setSelected(selectedOption);
        onSelect(selectedOption);
    }
    return (
 <div key = "0">
   <Select value={selected} id = "chooseFilter" onChange={handleSelect} w='200px'>
     {options.map((option) => (
                         <option key={option.value} value={option.value}>
                             {option.label}
                         </option>
                     ))}
   </Select>
   </div>
    )
}
export default SearchFilter;