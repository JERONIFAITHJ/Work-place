import React, { useReducer } from 'react';

export const UserInfoContext = React.createContext();

const initialState = {
    userData: JSON.parse(localStorage.getItem('USERDATA')) || null,
    dbData: JSON.parse(localStorage.getItem('DBDATA')) || null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERDATA':
            localStorage.setItem('USERDATA', JSON.stringify(action.payload));
            return {
                ...state,
                userData: action.payload
            };
        case 'SET_DBDATA':
            localStorage.setItem('DBDATA', JSON.stringify(action.payload));
            return {
                ...state,
                dbData: action.payload
            };
        default:
            throw new Error();
    }
}

const UserInfoContextComponent = (props) => {

    const [userContext, setUserContext] = useReducer(reducer, initialState);

    return (
        <UserInfoContext.Provider value={[userContext, setUserContext]}>
            {props.children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextComponent;