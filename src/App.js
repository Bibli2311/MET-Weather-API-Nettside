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
// The function assumes that the parameter is an array.
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
    let dropDownXMLData;
    switch(action.type)
    {
      case "faresignal":
      {
        // An object of every weather forecast is retrieved by getting all the "<item>" tags
        // from the XML data. All "<item>" tags represents one weather forecast.
        dropDownXMLData = action.xmlData.getElementsByTagName("item")
        // The XML data is filtered by a danger level ("gult", "oranje" or "rødt")
        // with the "action.parameter" variable.
        let incidents = sortByDangerLevel(dropDownXMLData, action.parameter); 
        let htmlOfIncidents = createIncidentList(incidents)
        return { htmlData: htmlOfIncidents }
      }
      case "type av værehendelse":
        // each <item> tag from the XML data represents one weather forecast from the API.
        dropDownXMLData = action.xmlData.getElementsByTagName("item")
        let eventArray = []

        let keyValues = Object.keys(dropDownXMLData)
        // Looping through "dropDownXMLData" to create an array of its elements.
        for (let i = 0; i < keyValues.length; i++)
        {
          eventArray.push(dropDownXMLData[keyValues[i]])
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
  const [isBold, setBoldTxt] = useState(
    {
      dangerLevelIsSet: false,
      weatherForecastType: false
    }
  )
  // first index shows CSS style for text description when user chooses danger level.
  // The second index of array shows CSS style for text when user filters weather forecast by type.
  const [boldStyle, setBoldStyle] = useState(
    [
      {
        fontWeight: "normal"
      },
      {
        fontWeight: "normal"
      }
    ]
  )

  //The variable name has "showAll" since the URL used is http://api.met.no/weatherapi/metalerts/1.1?show=all which
  //Has the parameter ?show=all
  //Creating this reference since it is useful to save it if the user changes danger level.
  //If user changes it then saved data can be filtered instead of sending another request to the API.
  let showAllXMLData = useRef("")

    useEffect(() =>
    {
      if (showAllXMLData.current === "")
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
      }
      else
      {
        dispatch(
          {
            type: "faresignal",
            xmlData: showAllXMLData.current,
            parameter: dangerLevel
          }
        )
      }
      
      
    }, [dangerLevel])

    //useEffect for setting event type (wind, snow, ice etc.)
    useEffect(() =>
    {      
      let url = eventTypeURL + translateEventTypes(eventType)
      fetchData(url)
      .then(fetchedXMLData =>
      {
        dispatch(
          {
            type: "type av værehendelse",
            xmlData: fetchedXMLData,
            parameter: eventType
          }
        )
      })
    }, [eventType])

    useEffect(() =>
    {
      if (isBold.dangerLevelIsSet)
      {

          // Set bold text for description when user selects danger level
          setBoldStyle( [
            {fontWeight: "bold"},
            {fontWeight: "normal"}
          ])
      }
      else if (isBold.weatherForecastType)
      {
        // Set bold text for description when user filters by weather forecast type
        setBoldStyle( [
          {fontWeight: "normal"},
          {fontWeight: "bold"}
        ])
      }

    }, [isBold])
   
  return (
    <div>
      <p style={{fontWeight: boldStyle[0]}}>Velg faresignal (gult, oransje eller rødt)</p>
      <DropdownSubmit reactHook={setDangerLevel} valuesOfSelectTag={dangerLevelValues}></DropdownSubmit>
      Hent værhendelser etter type (blowing snow, forest fire, ice osv.)
      <DropdownSubmit reactHook={setEventType} valuesOfSelectTag={eventValues}></DropdownSubmit>
      {dropDownState.htmlData}
      
    </div>

  );
}

export default App
