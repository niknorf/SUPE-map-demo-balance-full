import React from 'react';
import useGlobalState from './useGlobalStateProvider';
import Contex from './context';

const GlobalStateProvider = ({children}) => {
  return (
    <Contex.Provider value={useGlobalState()}>{children}</Contex.Provider>
  );
}

export default GlobalStateProvider;
