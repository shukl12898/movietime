import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip ,Button } from '@chakra-ui/react';

const SuggestionButton = () => {
  const [num, setNum] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setNum(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (num === '') {
      setError('Please enter a number');
    } else {
      setError('');
      navigate(`/suggestions/${num}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          How many movies do you want to be suggested for you?
          <input
            id = "SuggestionInputBox"
            type="number"
            value={num}
            min="1"
            max="10"
            onChange={handleInputChange}

          />
        </label>
        <Tooltip label="Maximum 10, Minimum 1" aria-label="Maximum 10, Minimum 1">
          <Button  id = "TooltipButton" size="xs" variant="outline">?</Button>
        </Tooltip>
        <Button type="submit" colorScheme="blue">Generate Suggestions</Button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default SuggestionButton;
