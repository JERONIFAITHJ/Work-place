import React, { useReducer } from "react";

export const DarkModeContext = React.createContext();

const initialState = {
  mode: JSON.parse(localStorage.getItem("MODE")) || false,
  typing: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DARKMODE":
      JSON.stringify(localStorage.setItem("MODE", !state.mode));
      return {
        ...state,
        mode: !state.mode,
      };
    case 'HIDE_NAVBAR': 
      return{
        ...state,
        typing: true
      }
    case 'SHOW_NAVBAR':
      return{
        ...state,
        typing: false
      }
    default:
      return {
        ...state,
        mode: state.mode,
      };
  }
};

const DarkModeContextComponent = ({ children }) => {
  const [mode, setMode] = useReducer(reducer, initialState);

  return (
    <DarkModeContext.Provider value={[mode, setMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContextComponent;
