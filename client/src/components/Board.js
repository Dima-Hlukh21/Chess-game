import React, { useContext } from "react";
import Cell from "./Cell";
import { SocketContext } from "./Socket";
import { GameStateContext, GameDispatchContext } from "./GameContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    html: {
      overflow: "hidden",
      overflowY: "hidden",
      overflowX: "hidden",
    },
    body: {
      width: "100vh",
      height: "100vh",
      background:
        "url(https://cdn.wallpapersafari.com/79/26/u6sDao.jpg) no-repeat center top fixed",
      webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover",
      backgroundSize: "cover",
    },
  },
  Hufflepuff: {
    width: "200px",
    height: "200px",
    position: "absolute",
    right: "0px",
    bottom: "0px",
  },

  container: {
   marginLeft:"660px",   
  // paddingBottom:"(userIsWhite===true)"? "0px": "1200px"
   
  },
  
    
  
}));

function GenerationBord() {
  const socket = useContext(SocketContext);
  const gameDispatch = useContext(GameDispatchContext);
  const gameState = useContext(GameStateContext);
  const classes = useStyles();

  

  socket.on("possibleMoves", ({ moves }) => {
    // { moves }
    document.querySelectorAll(".possible_step").forEach((el) => {
      el.classList.remove("possible_step");
    });
    moves.map((el) => {
      document
        .querySelectorAll("." + el.substr(-2))[0]
        .classList.add("possible_step");
    });
  });

  socket.on("upDateBoard", ({ gameBoard, nextStep }) => {
    gameDispatch({ type: "updateGameboard", data: gameBoard });
    gameDispatch({ type: "updateNextStep", data: nextStep });
    console.log(gameBoard, nextStep);
  });

  const width = 1920;
  const height = 1080;

  return (
    <div
      className="board"
      style={{
        width: width + "px",
        height: height + "px",
        marginTop:"160px",
        
      }}
    >
    
      {gameState.gameBoard.map((value, index) => {
        return <Row boardRowData={value} rowIndex={index} key={index} />;
      })}
    </div>
  );
}

function Row({ boardRowData, rowIndex }) {
  const classes = useStyles();
  const {user } = useContext(GameStateContext);
  const userIsWhite = user.white;
  return (
    <div className={classes.container}  style={{
     
    }}>
      <div>
        {boardRowData.map((value, index) => {
          return (
            <Cell
              boardCellData={value}
              cellIndex={index}
              rowIndex={rowIndex}
              key={index}
            />
            
          );
        })}
        
      </div>
     
        {console.log(userIsWhite)}
    </div>
  );
}



function Image(){
  const classes = useStyles();
return(
  <img
  alt="Hufflepuff"
  
  className={classes.Hufflepuff}
  src="https://www.nicepng.com/png/full/43-439104_hufflepuff-crest-harry-potter-banner-harry-potter-hufflepuff.png"
></img>
)

}
function CreateBord(){
  const {user } = useContext(GameStateContext);
  const userIsWhite = user.white;
  return(
  <div>
    <div  className={'rotate'} style={{
      transform: (userIsWhite)===true ? "rotate(0deg)": "rotate(180deg)",
      marginLeft:(userIsWhite)===true ?  "0px" :"1940px",
      marginTop:(userIsWhite)===true ?  "0px" :"-465px",
    }}>
  <GenerationBord/>
  </div>
  <Image/>
  
  </div>
  )
}
export default CreateBord;
