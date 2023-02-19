import React, { useState, useEffect } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";



function App() {
  const [incidentList, setWeatherIncident] = useState([])

  useEffect(() => {
   
    fetchData("https://api.met.no/weatherapi/metalerts/1.1?show=all")
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
   

  return (
    <div>
      {incidentList}
    </div>
  );
}

export default App
