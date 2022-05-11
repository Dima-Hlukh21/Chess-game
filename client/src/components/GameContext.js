import React from "react";

const GameStateContext = React.createContext();
const GameDispatchContext = React.createContext();

function gameReducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "updateGameboard": {
      return { ...state, gameBoard: action.data };
    }
    case "updateNextStep": {
      return { ...state, nextStep: action.data };
    }
    case "fullUpdate": {
      return { ...action.data };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GameProvider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer, {
    gameId: "",
    user: {},
    gameBoard: [],
    nextStep: "",
  });
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export { GameProvider, GameStateContext, GameDispatchContext };
