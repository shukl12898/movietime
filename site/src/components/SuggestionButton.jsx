import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip ,Button, Text,Flex} from '@chakra-ui/react';

const SuggestionButton = ({containsSomething}) => {
  const [num, setNum] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setNum(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!containsSomething){
        setError('Please select at least one movie.');
    }
    else if (num === '') {
      setError('Please enter a number');
    } else {
      setError('');
      navigate(`/suggestions/${num}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Flex justifyContent="center" alignItems="center">
          <Text color = "green.500">
          How many suggestions
          </Text>
          <Tooltip label="Maximum 10, Minimum 1" aria-label="Maximum 10, Minimum 1">
            <Button  id = "TooltipButton" size="xs" variant="outline">?</Button>
          </Tooltip>
          <input
            id = "SuggestionInputBox"
            type="number"
            value={num}
            min="1"
            max="10"
            onChange={handleInputChange}

          />

        <Button type="submit" colorScheme="blue">Generate Suggestions</Button>
        {error && <Text m1 ='2' color = "red">{error}</Text>}
        </Flex>
      </form>

    </div>
  );
};

export default SuggestionButton;