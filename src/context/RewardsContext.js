import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const addPoints = async (newPoints, showToast = true) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;
  
    try {
      // Assuming your backend expects a userId and the amount of points to add
      const response = await fetch(`/points`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers your backend requires
        },
        body: JSON.stringify({ userId, pointsToAdd: newPoints }), // Adjust to use userId
      });
  
      if (!response.ok) throw new Error('Failed to update points');
  
      const data = await response.json();
      const updatedPoints = data.points; // Adjust based on your actual API response structure
  
      setPoints(updatedPoints);
  
      if (showToast) {
        toast.success(`You gained ${newPoints} points! Total earned: ${updatedPoints} rewards.`, {
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
    } catch (error) {
      console.error('Error updating points:', error);
      // Optionally, handle the error with a notification to the user
    }
  };  

  useEffect(() => {
    const fetchPoints = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`/user/points`);
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