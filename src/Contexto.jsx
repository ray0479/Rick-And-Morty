import React, { createContext, useState } from 'react';

export const usernameContext = createContext();
export const darkmodeContext = createContext()

export const Provider = ({ children }) => {
  const [username, setUsername] = useState("Desconocido");
  const [darkmode, setDarkmode] = useState(true)
  return (
    <usernameContext.Provider value={{ username, setUsername }}>
      <darkmodeContext.Provider value={{darkmode, setDarkmode}}>
        {children}
      </darkmodeContext.Provider>
    </usernameContext.Provider>
  );
};


