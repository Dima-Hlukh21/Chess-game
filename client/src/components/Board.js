import React from 'react';
import { GameContext } from './GameContext';


function Cell({boardCellData, cellIndex, rowIndex, children}) {

  let square, color, type;
// type.map((type, color)=>{
  
// })
  if(boardCellData) {square = boardCellData.square; color = boardCellData.color; type = boardCellData.type;}
  // type.map((type, color) => {
  //   if(type, color) {}
  
  // })
   type="../img/Pawnb.png"
  return <div style={{
    backgroundImage: `url(${type})`,
    display: "inline-block",
    width: '75px',
    height: '75px',
    backgroundColor: ((cellIndex  +rowIndex) % 2)? 'lightgray': 'lightyellow'
  }}>{type} {color}</div>
}

function Row({boardRowData, rowIndex, children}) {
  return <div>  
    {boardRowData.map((value, index) => {
      return <Cell boardCellData={value} cellIndex={index} rowIndex={rowIndex} />
    })}  
  </div>
}

function CreateBord() {

  const { gameboard } = React.useContext(GameContext);

  const width = 600;
  const height = 600;
  
  return (
    <div
      className="board"
      style={{
        width: width + 'px',
        height: height + 'px',
      }}>

      {gameboard.map((value, index) => {
          return <Row boardRowData={value} rowIndex={index}/>
      })}

    </div>
  );
}

export default CreateBord;