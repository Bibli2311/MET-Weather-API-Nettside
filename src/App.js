import React, { useState, useEffect } from "react";

function sortByDangerLevel(array)
{
  let sortedIncidents = []
  let dangerLevelIncidents = []
  let keyValues = Object.keys(array)
  let incident;
  let dangerLevel = ""

  for (let i = 0; i < keyValues.length; i++)
  {
    
    incident = array[keyValues[i]].getElementsByTagName("title")[0]
    dangerLevel = incident.textContent.split(",")[1]
    if (dangerLevel.includes("nivå"))
    {

        dangerLevelIncidents.push(array[keyValues[i]])
    }
  }

  dangerLevelIncidents.forEach((value) => 
  {
      incident = value.getElementsByTagName("title")[0]
      dangerLevel = incident.textContent.split(",")[1]
      if (dangerLevel.includes("oransje"))
      {
        sortedIncidents.push(value)
      }
  })

  return sortedIncidents

}

function App() {
  const [nodeContent, setNodeContent] = useState([]);

  useEffect(() => {
    fetch("https://api.met.no/weatherapi/metalerts/1.1?show=all")
      .then((resp) => resp.text())
      .then((result) => {
        let xmlData = new window.DOMParser().parseFromString(result, "text/xml");
        let titleArray = xmlData.getElementsByTagName("item");
        console.log(titleArray)
        let orangeIncidents = sortByDangerLevel(titleArray)

        let nodes = [];
        /*
        let elem = titleArray[0];
        elem.childNodes.forEach((node) => {
          nodes.push(node.textContent);
        });
        setNodeContent(nodes);
*/
        orangeIncidents.forEach(value => 
          {
              value.childNodes.forEach(node => 
                {
                    nodes.push(node.textContent)
                })
          })
        setNodeContent(nodes)

      });

  }, []);

  return (
    <div>
      {nodeContent.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </div>
  );
}

export default App
