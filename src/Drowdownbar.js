import React from 'react';
import { useEffect, useState, useRef} from 'react';

function DropdownSubmit(props) {

  const [optionTags, setOptionTags] = useState([])
  const handleDropdownChange = (event) => {
    if (props.dangerLevelFunc === undefined || props.valuesOfDangerLevel === undefined)
    {
        console.error("Cannot retrieve React hook from prop. Look at the prop name when Dropdownbar is rendered.")
    }
    selectOption.current = event.target.value
    props.dangerLevelFunc(selectOption.current)
  };
  let selectOption = useRef("oransje")


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
          <select value={selectOption.current} onChange={handleDropdownChange}>
            {optionTags}
          </select>
    </div>
  );
}

export default DropdownSubmit;