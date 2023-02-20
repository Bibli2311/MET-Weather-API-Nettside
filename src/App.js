import React, { useState, useEffect, useRef } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";

import DropdownSubmit from "./Drowdownbar";



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
  
        let tmpIncidentList = [];
  
        // loop through each incident to extract the node content and add it to the nodes array
        incidents.forEach((value, index) => {
            tmpIncidentList.push(<WeatherIncident key={index} sortedIncident={value}></WeatherIncident>);
        });
        setWeatherIncident(tmpIncidentList);
      })
      
    }, [])
    useEffect(() =>
    {
        console.log(xmlFetchedData)
    }, [dangerLevel])
   

  return (
    <div>
      <DropdownSubmit dangerLevelFunc={setDangerLevel}></DropdownSubmit>
      {incidentList}
      
    </div>

  );
}

export default App
