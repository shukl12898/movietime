import React, {useState} from 'react';

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
            <select value={selected} id = "chooseFilter" onChange={handleSelect}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default SearchFilter;