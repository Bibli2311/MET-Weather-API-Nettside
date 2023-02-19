import React, { useState, useEffect } from "react";
import WeatherIncident from "./WeatherIncident";

 // function that sorts an array of items by danger level
function sortByDangerLevel(array) 
{
  let sortedIncidents = []
  let keyValues = Object.keys(array)
  let incident;
  let dangerLevel = ""

  // loop through each item in the array to find the ones with danger level of "nivå" and "oransje"
  for (let i = 0; i < keyValues.length; i++)
  {    
    incident = array[keyValues[i]].getElementsByTagName("title")[0]

    // get the danger level from the title element
    // example text that can be shown: "Kansellert Sterk ising på skip, oransje nivå, B4, 18 februar"
    dangerLevel = incident.textContent.split(",")[1]
    // check if the danger level includes "nivå" and "oransje"
    if (dangerLevel.includes("nivå") && dangerLevel.includes("oransje"))
    {
      sortedIncidents.push(array[keyValues[i]])
    }
  }
  return sortedIncidents
}

function App() {
  const [nodeContent, setNodeContent] = useState([]);
  const [incidentList, setWeatherIncident] = useState([])

  useEffect(() => {
    fetch("https://api.met.no/weatherapi/metalerts/1.1?show=all")
      .then((resp) => resp.text())
      .then((result) => {
        let xmlData = new window.DOMParser().parseFromString(result, "text/xml");
        let titleArray = xmlData.getElementsByTagName("item");
        console.log(titleArray)
        let orangeIncidents = sortByDangerLevel(titleArray)    

        let nodes = [];
        
       let tmpIncidentList = []      

        // loop through each incident to extract the node content and add it to the nodes array
        orangeIncidents.forEach((value, index) => 
          {
             tmpIncidentList.push(<WeatherIncident key={index} sortedIncident={value}></WeatherIncident>)
/*
              value.childNodes.forEach(node => 
                {
                    nodes.push(node.textContent)
                })*/
          })
        //setNodeContent(nodes)
        setWeatherIncident(tmpIncidentList)

      });

  }, []);

  return (
    <div>
      {incidentList}
    </div>
  );
}

export default App
