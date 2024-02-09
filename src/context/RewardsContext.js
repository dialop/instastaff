import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [triggerRefresh, setTriggerRefresh] = useState(false); // Used to trigger re-fetching points from the database

  // Optionally, include a mechanism to fetch points from the database
  // This could be a function within this context or an effect that listens to triggerRefresh
  useEffect(() => {
    const fetchPoints = async () => {
      // This example assumes you have a way to identify the user (e.g., stored userId)
      const userId = sessionStorage.getItem('userId'); // Ensure userId is stored and available
      if (!userId) return;

      try {
        const response = await fetch(`/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch points');

        const data = await response.json();
        setPoints(data.points); // Assuming the response directly contains the points or adjust according to your API response structure
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    if (triggerRefresh) {
      fetchPoints();
      // Optionally reset the trigger if you want to manually control each refresh
      // setTriggerRefresh(false);
    }
  }, [triggerRefresh]);

  return (
    <RewardsContext.Provider value={{ points, setPoints, triggerRefresh, setTriggerRefresh }}>
      {children}
    </RewardsContext.Provider>
  );
};
