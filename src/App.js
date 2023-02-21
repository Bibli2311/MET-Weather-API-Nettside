import React, { useState, useEffect, useRef } from "react";
import WeatherIncident from "./WeatherIncident";
import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";
import { translateEventTypes } from "./HelperFunctions";
import DropdownSubmit from "./Drowdownbar";
import { dangerLevelValues, eventTypeURL, eventValues } from "./constants";


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

function App() {
  const [incidentList, setWeatherIncident] = useState([])
  const [dangerLevel, setDangerLevel] = useState("")
  const [eventType, setEventType] = useState("vind")

  //The variable name has "showAll" since the URL used is http://api.met.no/weatherapi/metalerts/1.1?show=all which
  //Has the parameter ?show=all
  //Creating this reference since it is useful to save it if the user changes danger level.
  //If user changes it then saved data can be filtered instead of sending another request to the API.
  let showAllXMLData = useRef("")
  //Saving XML data for event types
  let eventXMLData = useRef("")

  useEffect(() => {
    fetchData("http://api.met.no/weatherapi/metalerts/1.1?show=all")
    .then((xmlData) =>
    {
        showAllXMLData.current = xmlData.getElementsByTagName("item");

        let incidents = sortByDangerLevel(showAllXMLData.current, "gult");
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

    //useEffect for setting event type (wind, snow, ice etc.)
    useEffect(() =>
    {      
      let url = eventTypeURL + translateEventTypes(eventType)
      console.log(eventType)
      fetchData(url)
      .then(value =>
      {
        eventXMLData.current = value.getElementsByTagName("item")
        let eventArray = []
        let keyValues = Object.keys(eventXMLData.current)
        let titleTag;
        for (let i = 0; i < keyValues.length; i++)
        {
          titleTag = eventXMLData.current[keyValues[i]].getElementsByTagName("title")[0]
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
      {incidentList}
      
    </div>

  );
}

export default App
