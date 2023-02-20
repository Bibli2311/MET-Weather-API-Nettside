import React from 'react';
import { useEffect, useState } from 'react';

function DropdownSubmit(props) {

  const [optionTags, setOptionTags] = useState([])
  const handleDropdownChange = (event) => {
    if (props.dangerLevelFunc === undefined || props.valuesOfDangerLevel === undefined)
    {
        console.error("Cannot retrieve React hook from prop. Look at the prop name when Dropdownbar is rendered.")
    }

    props.dangerLevelFunc(event.target.value)
  };


  //run useEffect only once
  useEffect(() =>
  {
    let tmpOptionTag = []
    props.valuesOfDangerLevel.map(value =>
    {
        tmpOptionTag.push(
          <option key={value} value={value}>{value}</option>
        )
    })
    setOptionTags(tmpOptionTag)
  }, [])


  return (
    <div>
          <select value={""} onChange={handleDropdownChange}>
            {optionTags}
          </select>
    </div>
  );
}

export default DropdownSubmit;