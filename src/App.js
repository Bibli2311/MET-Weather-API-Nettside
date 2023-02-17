import axios from 'axios'


export default function Board() {
  let numbs = []
  for (let i=1; i<=10; i++)
  {
      numbs.push(i)
  }

  let row = [0,1,2].map((i) => <button className="square" id={`square${i}`}>X</button>)
/*
  async function getData()
  {
    axios.get('https://api.met.no/weatherapi/metalerts/1.1?show=all')
    .then(response => {
  
      return response
      
      }).catch(function (err)
      {
        console.log(err)
      })
  }

  getData().then((resp) => 
  {
    console.log(resp)
  })*/
  fetch("https://api.met.no/weatherapi/metalerts/1.1?show=all")
  .then((resp) => resp.text())
  .then(result => 
    {
        console.log(result)
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
