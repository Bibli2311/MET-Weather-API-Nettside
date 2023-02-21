import React, { useState, useEffect, useRef, useReducer } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";
import { translateEventTypes } from "./HelperFunctions";
import DropdownSubmit from "./Drowdownbar";
import { dangerLevelValues, eventTypeURL, eventValues } from "./constants";

const initialState = 
{
  htmlData: <p>{"trykk på drop down meny"}</p>
}



//creates <WeatherIncident> component for every weather incident from parameter "incidentList"
function createIncidentList(incidentList)
{
  let tmpIncidentList = []
  let element;
  incidentList.forEach((value, index) => 
  {
    element = <WeatherIncident key={index} sortedIncident={value}></WeatherIncident>
    tmpIncidentList.push(element);
  });
  return tmpIncidentList
}

function handleDropDown(state, action)
{
    let xmlReducerData;
    switch(action.type)
    {
      case "faresignal":
      {
        let incidents = ""
        xmlReducerData = action.xmlData.getElementsByTagName("item")
        incidents = sortByDangerLevel(xmlReducerData, action.chosenDangerLevel); 
        let htmlOfIncidents = createIncidentList(incidents)
        return { htmlData: htmlOfIncidents }
      }
      case "type av værehendelse":
        console.log("coming soon")
        break;
      default:
        console.error("invalid action type in reducer")
        return initialState
    }
  }

function App() {
  

  const [dropDownState, dispatch] = useReducer(handleDropDown, initialState)
  const [incidentList, setWeatherIncident] = useState([])
  const [dangerLevel, setDangerLevel] = useState("gult")
  const [eventType, setEventType] = useState("vind")

  //The variable name has "showAll" since the URL used is http://api.met.no/weatherapi/metalerts/1.1?show=all which
  //Has the parameter ?show=all
  //Creating this reference since it is useful to save it if the user changes danger level.
  //If user changes it then saved data can be filtered instead of sending another request to the API.
  let showAllXMLData = useRef("")
  //Saving XML data for event types
  let eventXMLData = useRef("")

    useEffect(() =>
    {
      fetchData("http://api.met.no/weatherapi/metalerts/1.1?show=all")
      .then((xmlData) =>
      {
        showAllXMLData.current = xmlData
        dispatch(
          {
            type: "faresignal",
            xmlData: showAllXMLData.current,
            chosenDangerLevel: dangerLevel
          }
        )
      })
      
    }, [dangerLevel])

    //useEffect for setting event type (wind, snow, ice etc.)
    useEffect(() =>
    {      
      let url = eventTypeURL + translateEventTypes(eventType)
      fetchData(url)
      .then(value =>
      {
        eventXMLData.current = value.getElementsByTagName("item")
        let eventArray = []
        let keyValues = Object.keys(eventXMLData.current)
        for (let i = 0; i < keyValues.length; i++)
        {
          eventArray.push(eventXMLData.current[keyValues[i]])
        }
        setWeatherIncident(createIncidentList(eventArray))
      })
    }, [eventType])
   

  return (
    <div>
      Velg faresignal (gult, oransje eller rødt)
      <DropdownSubmit reactHook={setDangerLevel} valuesOfSelectTag={dangerLevelValues}></DropdownSubmit>
      Hent værhendelser etter type (blowing snow, forest fire, ice osv.)
      <DropdownSubmit reactHook={setEventType} valuesOfSelectTag={eventValues}></DropdownSubmit>
      useREducer:
      {dropDownState.htmlData}
      
    </div>

  );
}

export default App
