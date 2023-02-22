import React from 'react';
import { useEffect, useState, useRef} from 'react';
import { changeDangerLevel, setWeatherForecastType} from './constants'

function DropdownSubmit(props) 
{
  const [optionTags, setOptionTags] = useState([])
  const handleDropdownChange = (event) => {
    if (props.reactHook === undefined || props.valuesOfSelectTag === undefined)
    {
        console.error("Cannot retrieve React hook from prop. Look at the prop name when Dropdownbar is rendered.")
    }
    selectOption.current = event.target.value
    props.reactHook(selectOption.current)


    switch(props.userActionDesc)
    {
      case changeDangerLevel:
      props.reducerHook(
        {
          type: "set danger level",
          hook: props.boldHook
        }
      )
      break;
      case setWeatherForecastType:
        props.reducerHook(
        {
          type: "set weather forecast type",
          hook: props.boldHook
        }
        )
        break;
      default:
        console.error("no valid user action description is passed to Dropdownbar component")
    }
    
  };
  let selectOption = useRef(props.valuesOfSelectTag[0])

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
  }, [])   //run useEffect only once


  return (
    <div>
          <select value={selectOption.current} onChange={handleDropdownChange}>
            {optionTags}
          </select>
    </div>
  );
}

export default DropdownSubmit;