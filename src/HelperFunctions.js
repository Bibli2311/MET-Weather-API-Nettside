// function that sorts an array of items by danger level
 function sortByDangerLevel(array, dangerLevel) 
 {
   let sortedIncidents = []
   let keyValues = Object.keys(array)
   let incident;
   let currentDangerLevel = ""

   if (array === undefined) { console.error("undefined array in HelperFunction")}
 
   // loop through each item in the array to find the ones with danger level of "nivå" and "oransje"
   for (let i = 0; i < keyValues.length; i++)
   {    
    incident = array[keyValues[i]].getElementsByTagName("title")[0]
 
     // get the danger level from the title element
     // example text that can be shown: "Kansellert Sterk ising på skip, oransje nivå, B4, 18 februar"
     currentDangerLevel = incident.textContent.split(",")[1]
     // check if the danger level includes "nivå" and "oransje"
     if (currentDangerLevel.includes("nivå") && currentDangerLevel.includes(dangerLevel))
     {
       sortedIncidents.push(array[keyValues[i]])
     }
   }
   return sortedIncidents
 }

async function fetchData(url)
{
  const headers = new Headers();
  headers.append('User-Agent', "MyTestApp/0.1 oscar.vagle@yahoo.no")


  try
  {
    const resp = await fetch(url, headers);
    if (resp.ok)
    {
      let respTxt = await resp.text()
      return new window.DOMParser().parseFromString(respTxt, "text/xml");
    }
    throw new Error("Error with network");  
  }
  catch (error)
  {
    console.error(error)
  }
}

export {sortByDangerLevel, fetchData}

