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
        xmlReducerData = action.xmlData.getElementsByTagName("item")
        let incidents = sortByDangerLevel(xmlReducerData, action.parameter); 
        let htmlOfIncidents = createIncidentList(incidents)
        return { htmlData: htmlOfIncidents }
      }
      case "type av værehendelse":
        xmlReducerData = action.xmlData.getElementsByTagName("item")
        let eventArray = []

        let keyValues = Object.keys(xmlReducerData)
        for (let i = 0; i < keyValues.length; i++)
        {
          eventArray.push(xmlReducerData[keyValues[i]])
        }
        let htmlOfIncidents = createIncidentList(eventArray)
        return { htmlData: htmlOfIncidents }        
      default:
        console.error("invalid action type in reducer")
        return initialState
    }
  }

function App() {
  

  const [dropDownState, dispatch] = useReducer(handleDropDown, initialState)
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
        // XML data ("showAllXMLData") and the danger level is passed inside the
        // parameter as an action. This is used in the reducer to sort incidents based on
        // danger level.
        dispatch(
          {
            type: "faresignal",
            xmlData: showAllXMLData.current,
            parameter: dangerLevel
          }
        )
      })
      
    }, [dangerLevel])

    //useEffect for setting event type (wind, snow, ice etc.)
    useEffect(() =>
    {      
      let url = eventTypeURL + translateEventTypes(eventType)
      fetchData(url)
      .then(fetchedXMLData =>
      {
        //updating this reference for now.
        eventXMLData.current = fetchedXMLData.getElementsByTagName("item")
        dispatch(
          {
            type: "type av værehendelse",
            xmlData: fetchedXMLData,
            parameter: eventType
          }
        )
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
