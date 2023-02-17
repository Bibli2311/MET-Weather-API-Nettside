import axios from 'axios'

export default function Board() {
  let numbs = []
  for (let i=1; i<=10; i++)
  {
      numbs.push(i)
  }

  let row = [0,1,2].map((i) => <button className="square" id={`square${i}`}>X</button>)

  let xmlResult = "";
  fetch("https://api.met.no/weatherapi/metalerts/1.1?show=all")
  .then((resp) => resp.text())
  .then(result => 
    {
      let xmlData = new window.DOMParser()
           .parseFromString(result, "text/xml")
      console.log(xmlData)

      let titleArray = xmlData.getElementsByTagName("item")

      let elem = titleArray[0]
      //console.log(elem.textContent)
      elem.childNodes.forEach((node) => 
      {
          console.log(node.textContent)
      })
    })


   
  return (
  <>
    <div className="board-row">
      {row}
    </div>
    <div className="board-row">
      {row}
    </div>
    <div className="board-row">
      {row}
    </div>        
  </>)
}
