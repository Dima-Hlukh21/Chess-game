import React from 'react';
import FirstPage from './components/FirstPage';
import {SocketContext, socket} from './components/Socket';


function App() {
  return (
    <SocketContext.Provider value={socket}>

    <FirstPage/> 
    </SocketContext.Provider>

  );
}

export default App;
