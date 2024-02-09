// Context.js
import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <RegistrationContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </RegistrationContext.Provider>
  );
};
