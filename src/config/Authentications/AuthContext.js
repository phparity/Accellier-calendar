import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = props => {

  const [authState, setAuthState] = useState(JSON.parse(sessionStorage.getItem('user')))
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthContext.Provider>
  );
}


