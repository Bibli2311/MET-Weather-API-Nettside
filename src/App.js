import React, { useState, useEffect, useRef } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";

import DropdownSubmit from "./Drowdownbar";


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

  let xmlFetchedData = useRef("")
  useEffect(() => {
   
    fetchData("http://api.met.no/weatherapi/metalerts/1.1?show=all")
    .then((xmlData) =>
    {
        xmlFetchedData.current = xmlData.getElementsByTagName("item");

        let incidents = sortByDangerLevel(xmlFetchedData.current, "oransje");
        setWeatherIncident(createIncidentList(incidents))
      })
      
    }, [])
    useEffect(() =>
    {
      //Retrieve danger levels with updated dangerLevel from user from drop down menu
      let updatedIncidents = sortByDangerLevel(xmlFetchedData.current, dangerLevel)
      console.log(updatedIncidents)
    }, [dangerLevel])
   

  return (
    <div>
      <DropdownSubmit dangerLevelFunc={setDangerLevel}></DropdownSubmit>
      {incidentList}
      
    </div>

  );
}

export default App
