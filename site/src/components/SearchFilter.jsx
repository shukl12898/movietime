import React, { useState } from "react";
import {VStack, Checkbox, CheckboxGroup} from "@chakra-ui/react";

const SearchFilter = ({ options, onSelect }) => {
    const [selectedValues, setSelectedValues] = useState([]);

    function handleCheckboxChange(values) {
        console.log('Seclected Values:',values);
        setSelectedValues(values);
        onSelect(values);
    }

    return (
        <CheckboxGroup colorScheme="green" onChange={handleCheckboxChange} value={selectedValues}>
            <VStack alignItems="start">
                {options.map((option) => (
                    <Checkbox key={option.value} value={option.value}>
                        {option.label}
                    </Checkbox>
                ))}
            </VStack>
        </CheckboxGroup>
    );
}

export default SearchFilter;