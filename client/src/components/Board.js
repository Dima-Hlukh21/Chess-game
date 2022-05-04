import React, {useContext, useEffect} from 'react';
import Cell from './Cell';
import {SocketContext} from './Socket'
import { GameStateContext, GameDispatchContext } from './GameContext';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  '@global':{
    html: {
        overflow: 'scroll',
        
        overflowX:'hidden',
        
         },
body :{
    width: '100vh',
    height: '100vh',
    background: 'url(https://cdn.wallpapersafari.com/79/26/u6sDao.jpg) no-repeat center top fixed',
    webkitBackgroundSize: 'cover',
    mozBackgroundSize: 'cover',
    oBackgroundSize: 'cover',
    backgroundSize: 'cover',
},

},
Hufflepuff:{
  width: '200px',
  height: '200px',
  position: 'absolute',
  right: '0px',
  bottom: '0px',
},



}));

function CreateBord() {  
  const classes = useStyles();
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
  const classes = useStyles();
  return <div className={classes.container}>
  <div>  
    {boardRowData.map((value, index) => {
      return <Cell boardCellData={value} cellIndex={index} rowIndex={rowIndex} key={index}/>
    })}  
  </div>
  <img className={classes.Hufflepuff} src = 'https://www.nicepng.com/png/full/43-439104_hufflepuff-crest-harry-potter-banner-harry-potter-hufflepuff.png'></img>
  </div>
}

export default CreateBord;