import React from 'react';
import FirstPage from './components/FirstPage';
import {SocketContext, socket} from './components/Socket';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateBord from './components/Board';

function App() {
  return (
    <SocketContext.Provider value={socket}>
 <BrowserRouter basename="/">
 <Routes>

     
      <Route path="/" element={ <FirstPage/> } />
      <Route path="/game" element={ <CreateBord/> } />
      </Routes>

      </BrowserRouter>

    </SocketContext.Provider>

  );
}

export default App;
