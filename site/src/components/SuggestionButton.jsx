import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tooltip from './Tooltip';

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
            type="number"
            value={num}
            min="1"
            max="10"
            onChange={handleInputChange}
          />
        </label>
        <Tooltip text="Maximum 10, Minimum 1">
          <button>?</button>
        </Tooltip>
        <button type="submit">Generate Suggestions</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default SuggestionButton;

