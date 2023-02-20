import React, { useState, useEffect } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";

import DropdownSubmit from "./Drowdownbar";



function App() {
  const [incidentList, setWeatherIncident] = useState([])
  const [dangerLevel, setDangerLevel] = useState("")

  useEffect(() => {
   
    fetchData("http://api.met.no/weatherapi/metalerts/1.1?show=all")
    .then((xmlData) =>
    {
        let tmp = xmlData
        let titleArray = xmlData.getElementsByTagName("item");
        console.log(titleArray);
        let orangeIncidents = sortByDangerLevel(titleArray);
  
        let tmpIncidentList = [];
  
        // loop through each incident to extract the node content and add it to the nodes array
        orangeIncidents.forEach((value, index) => {
            tmpIncidentList.push(<WeatherIncident key={index} sortedIncident={value}></WeatherIncident>);
        });
        setWeatherIncident(tmpIncidentList);
      })
      
    }, [])
    useEffect(() =>
    {
        console.log("from APP.js: " + dangerLevel)
    }, [dangerLevel])
   

  return (
    <div>
      {incidentList}
      <DropdownSubmit dangerLevelFunc={setDangerLevel}></DropdownSubmit>
    </div>

  );
}

export default App
