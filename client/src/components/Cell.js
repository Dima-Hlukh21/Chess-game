import {SocketContext} from './Socket'
import React, {useContext, useEffect} from 'react';
import { GameContext } from './GameContext';

export default function Cell({boardCellData, cellIndex, rowIndex }) {
    const { gameId, userId, userIsWhite, nextStep } = useContext(GameContext);
    const socket = useContext(SocketContext);

    
        

    let square = boardCellData.square; 
    let color = boardCellData.color;
    let type = 'none';
    let visibleForB = boardCellData.visibleForB;
    let visibleForW = boardCellData.visibleForW;
  
    const backlight = ({target}) => {
        
      if(nextStep != userId) return;
      document.querySelectorAll('.active').forEach((item)=>item.classList.toggle('active'))
    console.log(square)
      socket.emit('possibleMoves', { gameId, userId, square })
      target.classList.toggle('active')
    };
  

    if(userIsWhite === visibleForW){
      type = boardCellData.type;
    }
  
    return <div 
      className={`figure_type_${type}${color} ${square} visibleForW_${visibleForW} visibleForB_${visibleForB}`} 
      style={{
        display: "inline-block",
        width: '75px',
        height: '75px',
        backgroundColor: ((cellIndex  +rowIndex) % 2)? 'lightgray': 'lightyellow'
      }}
      onClick={backlight} 
    >{square}</div>
}