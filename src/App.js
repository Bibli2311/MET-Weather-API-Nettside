import React, { useState, useEffect, useRef } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";

import DropdownSubmit from "./Drowdownbar";

import { dangerLevelValues, eventTypeURL, eventValues } from "./constants";


//creates <WeatherIncident> component for every weather incident from parameter "incidentList"
function createIncidentList(incidentList)
{
  let tmpIncidentList = []
  incidentList.forEach((value, index) => 
  {
    tmpIncidentList.push(<WeatherIncident key={index} sortedIncident={value}></WeatherIncident>);
  });
  return tmpIncidentList
}

function App() {
  const [incidentList, setWeatherIncident] = useState([])
  const [dangerLevel, setDangerLevel] = useState("")
  const [eventType, setEventType] = useState("wind")

  //The variable name has "showAll" since the URL used is http://api.met.no/weatherapi/metalerts/1.1?show=all which
  //Has the parameter ?show=all
  let showAllXMLData = useRef("")
  //Saving XML data for event types
  let eventXMLData = useRef("")

  useEffect(() => {
   
    fetchData("http://api.met.no/weatherapi/metalerts/1.1?show=all")
    .then((xmlData) =>
    {
        showAllXMLData.current = xmlData.getElementsByTagName("item");

        let incidents = sortByDangerLevel(showAllXMLData.current, "oransje");
        setWeatherIncident(createIncidentList(incidents))
      })
      
    }, [])
    useEffect(() =>
    {
      //Retrieve danger levels with updated dangerLevel from user from drop down menu
      let updatedIncidents = sortByDangerLevel(showAllXMLData.current, dangerLevel)
      let incidentList = createIncidentList(updatedIncidents)

      if (incidentList.length === 0)
      {
          setWeatherIncident(<p>{"Det finnes ingen værehendelse for dette"}</p>)
      }
      else
      {
        setWeatherIncident(incidentList)
      }
      
    }, [dangerLevel])

    //useEffect for setting event type (wind, snow etc.)
    useEffect(() =>
    {
      let url = eventTypeURL + eventValues[0]
      fetchData(url)
      .then(value =>
      {
        eventXMLData.current = value.getElementsByTagName("item")
        let eventArray = []
        let keyValues = Object.keys(eventXMLData.current)
        for (let i = 0; i < keyValues; i++)
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
      {incidentList}
      
    </div>

  );
}

export default App
