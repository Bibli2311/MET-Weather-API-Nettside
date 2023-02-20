import React, { useState, useEffect, useRef } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";

import DropdownSubmit from "./Drowdownbar";

import { dangerLevelValues, eventTypeURL } from "./constants";


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

  let showAllXMLData = useRef("")
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

    useEffect(() =>
    {
      fetchData(eventTypeURL)
      .then(value =>
      {
        
      })
    }, [eventType])
   

  return (
    <div>
      Velg faresignal (gult, oransje eller rødt)
      <DropdownSubmit dangerLevelFunc={setDangerLevel} valuesOfDangerLevel={dangerLevelValues}></DropdownSubmit>
      {incidentList}
      
    </div>

  );
}

export default App
