import React, { useState } from 'react';

function DropdownSubmit() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    console.log("from DORPDOWN: " + event.target.value)
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Select an option:
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="">--Please choose an option--</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DropdownSubmit;