// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const updateUserProfile = (profile) => {
    setUserProfile(profile);
    setIsProfileVisible(true); // Automatically show the profile card upon update
  };

  return (
    <UserContext.Provider value={{ userProfile, isProfileVisible, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
