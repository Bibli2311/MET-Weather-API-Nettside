import React from 'react';

function DropdownSubmit(props) {

  const handleDropdownChange = (event) => {
    if (props.dangerLevelFunc === undefined)
    {
        console.error("Cannot retrieve React hook from prop. Look at the prop name when Dropdownbar is rendered.")
    }

    props.dangerLevelFunc(event.target.value)
  };

  return (
    <div>
          Select an option:
          <select value={""} onChange={handleDropdownChange}>
            <option value="">--Please choose an option--</option>
            <option value="gult">Gult</option>
            <option value="oransje">Oransje</option>
            <option value="rødt">Rødt</option>
          </select>
    </div>
  );
}

export default DropdownSubmit;