import React, {useContext, useEffect} from 'react';
import Cell from './Cell';
import {SocketContext} from './Socket'
import { GameStateContext, GameDispatchContext } from './GameContext';

function CreateBord() {  
  const socket = useContext(SocketContext);
  const gameDispatch = useContext(GameDispatchContext);
  const gameState = useContext(GameStateContext);

  socket.on('possibleMoves', ({moves}) => {         // { moves }
      document.querySelectorAll('.possible_step').forEach((el)=>{
      el.classList.remove('possible_step')
    })
    moves.map((el)=>{
      document.querySelectorAll('.'+el.substr(-2))[0].classList.add('possible_step')
    })
  })

  socket.on('upDateBoard', ({gameBoard, nextStep}) => {    
    gameDispatch({type: 'updateGameboard', data: gameBoard})
    gameDispatch({type: 'updateNextStep', data: nextStep})
    console.log(gameBoard, nextStep)
  })  
  
  const width = 600;
  const height = 600;

  return (
    <div
      className="board"
      style={{
        width: width + 'px',
        height: height + 'px',
      }}>

      {gameState.gameBoard.map((value, index) => {
          return <Row boardRowData={value} rowIndex={index} key={index}/>
      })}

    </div>
  );
}

function Row({boardRowData, rowIndex }) {
  return <div>  
    {boardRowData.map((value, index) => {
      return <Cell boardCellData={value} cellIndex={index} rowIndex={rowIndex} key={index}/>
    })}  
  </div>
}

export default CreateBord;