import React, { createContext, useContext, useReducer,useCallback } from 'react';
import { useEffect } from 'react';
import { useBeforeUnload } from 'react-router-dom';

const initialState = {};
const DataContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'I_DATA':
      return {
        ...action.value
      };
    case 'C_DATA':
      return {};
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (key, value) => {
    if(key === "C_DATA"){ dispatch({ type: key});}
    else{dispatch({ type: 'SET_DATA', key, value });}
  };

  const initData = (value) => {
    dispatch({ type: 'I_DATA', value });
  };

  const contextValue = {
    data: state,
    setData,
  };

  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem("v_DATA", JSON.stringify(state))
    }, [state])
  );

  React.useEffect(() => {
    if (Object.entries(state).length === 0 && localStorage.getItem("v_DATA") !== null) {
      initData(JSON.parse(localStorage.getItem("v_DATA")));
      localStorage.removeItem("v_DATA")
    }
  }, []);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
