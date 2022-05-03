import React from 'react';
import FirstPage from './components/FirstPage';
import {SocketContext, socket} from './components/Socket';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateBord from './components/Board';
import { GameContext } from './components/GameContext';



function App() {
  const [gameState, setGameState] = React.useState({gameId: '', user: {}, gameBoard: [], nextStep: '' });

  function updateGameboard(newBoard){
    setGameState({...gameState, gameboard: newBoard})
  }

  function updateNextStep(nextStep){
    setGameState({...gameState, nextStep: nextStep})
  }

  const gameValue = {
    gameId: gameState.gameId,
    gameBoard: gameState.gameBoard,
    userId: gameState.user.id,
    userIsWhite: (gameState.user.white === 'true'),
    nextStep: gameState.nextStep,
    updateGameboard: updateGameboard,
    updateNextStep: updateNextStep,
    setGameState: setGameState
  };


  return (
    <SocketContext.Provider value={socket}>
      <GameContext.Provider value={gameValue}>
        <BrowserRouter basename="/">
        <Routes>     
          <Route path="/" element={ <FirstPage/> } />
          <Route path="/game" element={ <CreateBord/> } />
        </Routes>
        </BrowserRouter>
      </GameContext.Provider>
    </SocketContext.Provider>

  );
}

export default App;
