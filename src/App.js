export default function Board() {
  let numbs = []
  for (let i=1; i<=10; i++)
  {
      numbs.push(i)
  }

  let row = [0,1,2].map((i) => <button className="square" id={`square${i}`}>X</button>)

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
