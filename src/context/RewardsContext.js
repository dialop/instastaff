import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const addPoints = (newPoints, showToast = true) => {
    setPoints(prevPoints => {
      const updatedPoints = prevPoints + newPoints;
      if (showToast) {
        toast.success(`You earned ${newPoints} points!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return updatedPoints;
    });
  };

  useEffect(() => {
    const fetchPoints = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch points');

        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, [triggerRefresh]); 

  return (
    <RewardsContext.Provider value={{ points, setPoints, triggerRefresh, setTriggerRefresh, addPoints }}>
      {children}
    </RewardsContext.Provider>
  );
};