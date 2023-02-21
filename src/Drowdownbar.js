import React from 'react';
import { useEffect, useState, useRef} from 'react';

function DropdownSubmit(props) {

  const [optionTags, setOptionTags] = useState([])
  const handleDropdownChange = (event) => {
    if (props.reactHook === undefined || props.valuesOfSelectTag === undefined)
    {
        console.error("Cannot retrieve React hook from prop. Look at the prop name when Dropdownbar is rendered.")
    }
    selectOption.current = event.target.value
    props.reactHook(selectOption.current)
  };
  let selectOption = useRef("oransje")


  //run useEffect only once
  useEffect(() =>
  {
    let tmpOptionTag = []
    props.valuesOfSelectTag.map(value =>
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