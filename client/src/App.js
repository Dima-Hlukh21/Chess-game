import React from 'react';
import FirstPage from './components/FirstPage';
import {SocketContext, socket} from './components/Socket';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateBord from './components/Board';
import { GameProvider } from './components/GameContext';



function App() {
  return (
    <SocketContext.Provider value={socket}>
      <GameProvider>
        <BrowserRouter basename="/">
          <Routes>     
            <Route path="/" element={ <FirstPage/> } />
            <Route path="/game" element={ <CreateBord/> } />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </SocketContext.Provider>

  );
}

export default App;
