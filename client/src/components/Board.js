import React, {useContext, useEffect} from 'react';
import { GameContext } from './GameContext';
import Cell from './Cell';
import {SocketContext} from './Socket'

function CreateBord() {  
  const socket = useContext(SocketContext);
  
  socket.on('possibleMoves', ({moves}) => {         // { moves }
    console.log(moves)
    document.querySelectorAll('.possible_step').forEach((el)=>{
      console.log(321)
      el.classList.remove('possible_step')
    })
    moves.map((el)=>{
      document.querySelectorAll('.'+el.substr(-2))[0].classList.add('possible_step')
    })
  })

  const { gameBoard } = React.useContext(GameContext);
  const width = 600;
  const height = 600;
  
  return (
    <div
      className="board"
      style={{
        width: width + 'px',
        height: height + 'px',
      }}>

      {gameBoard.map((value, index) => {
          return <Row boardRowData={value} rowIndex={index}/>
      })}

    </div>
  );
}

function Row({boardRowData, rowIndex, userId, userIsWhite, nextStep }) {
  return <div>  
    {boardRowData.map((value, index) => {
      return <Cell boardCellData={value} cellIndex={index} rowIndex={rowIndex} />
    })}  
  </div>
}

export default CreateBord;