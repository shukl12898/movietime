import React, {useState} from 'react';
import { Input } from '@chakra-ui/react'

// functional component
const YearPicker = ({onStartYearSelect, onEndYearSelect}) => {
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState ("");

    const handleStartChange = (event) =>{
        const selectedYear = event.target.value;
        setStartYear(selectedYear);
        onStartYearSelect(selectedYear);
    }

    const handleEndChange = (event) =>{
        const selectedYear = event.target.value;
        setEndYear(selectedYear);
        onEndYearSelect(selectedYear);
    }

    return (
        <div key = "0">
            <Input id = "startYear" value = {startYear} htmlSize = {4} width= 'auto' placeholder = 'Start'
                   onChange = {handleStartChange}>
            </Input>
            <Input id = "endYear" value = {endYear} htmlSize = {4} width= 'auto' placeholder = 'End'
                   onChange = {handleEndChange}>
            </Input>
        </div>
    )
}
export default YearPicker;