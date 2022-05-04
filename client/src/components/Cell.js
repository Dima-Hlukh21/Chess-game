import {SocketContext} from './Socket'
import React, {useContext} from 'react';
import { GameStateContext } from './GameContext';

export default function Cell({boardCellData, cellIndex, rowIndex }) {    
    const socket = useContext(SocketContext);
    const { gameId, user, nextStep } = useContext(GameStateContext);
    const userId = user.id;
    const userIsWhite = user.white;

    let square = boardCellData.square; 
    let color = boardCellData.color;
    let type = 'none';
    let visibleForB = boardCellData.visibleForB;
    let visibleForW = boardCellData.visibleForW;
  
    const backlight = ({target}) => {
        if(target.classList.contains('possible_step')){
            document.querySelector('.active')
            socket.emit('step', { gameId,  from: document.querySelector('.active').dataset.square,  to: target.dataset.square })
            return
        }
        if(nextStep != userId) return;
        document.querySelectorAll('.active').forEach((item)=>item.classList.toggle('active'))
      socket.emit('possibleMoves', { gameId, userId, square })
      target.classList.toggle('active')
    };  

    if(userIsWhite === visibleForW || ((visibleForW == visibleForB) && visibleForW == true)){
      type = boardCellData.type;
    }
  
    return <div 
        className={`figure_type_${type}${color} ${square} visibleForW_${visibleForW} visibleForB_${visibleForB}`} 
        style={{
            display: "inline-block",
            width: '75px',
            height: '75px',
            backgroundColor: ((cellIndex  +rowIndex) % 2)? 'black': 'lightyellow'
        }}
        data-square={square}
        onClick={backlight} 
    >{square}</div>
}