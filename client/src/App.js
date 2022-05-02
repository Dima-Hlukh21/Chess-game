import React from 'react';
import FirstPage from './components/FirstPage';
import {SocketContext, socket} from './components/Socket';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateBord from './components/Board';
import { GameContext } from './components/GameContext';



function App() {
  const [gameState, setGameState] = React.useState({gameboard: []});

  function updateGameboard(newBoard){
    setGameState({...gameState, gameboard: newBoard})
  }
  
  const gameValue = {
    gameboard: gameState.gameboard,
    updateGameboard: updateGameboard
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
