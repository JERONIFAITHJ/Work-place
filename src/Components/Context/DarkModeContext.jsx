import React, { useReducer } from "react";

export const DarkModeContext = React.createContext();

const initialState = {
  mode: JSON.parse(localStorage.getItem("MODE")) || false,
};

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_DARKMODE':
            JSON.stringify(localStorage.setItem('MODE', !state.mode));
            return{
                mode: !state.mode
            }
        default:
            return{
                mode: state.mode
            }
    }
}

const DarkModeContextComponent = ({ children }) => {
  const [mode, setMode] = useReducer(reducer, initialState);

  return (
    <DarkModeContext.Provider value={[mode, setMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContextComponent;