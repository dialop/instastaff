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
      const userId = sessionStorage.getItem('userId'); // Make sure userId is set in session storage
      if (!userId) return;

      try {
        const response = await fetch(`/user/${userId}`, {
          headers: {
            // Include headers for authentication if needed
          },
        });
        if (!response.ok) throw new Error('Failed to fetch points');

        const data = await response.json();
        setPoints(data.points); // Update points from the response
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, [triggerRefresh]); // Ensure this effect runs every time triggerRefresh changes

  return (
    <RewardsContext.Provider value={{ points, setPoints, triggerRefresh, setTriggerRefresh, addPoints }}>
      {children}
    </RewardsContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const RewardsContext = createContext();

// export const useRewards = () => useContext(RewardsContext);

// export const RewardsProvider = ({ children }) => {
//   const [points, setPoints] = useState(0);
//   const [triggerRefresh, setTriggerRefresh] = useState(false); // Used to trigger re-fetching points from the database

//   // Fetch points from the database
//   // This could be a function within this context or an effect that listens to triggerRefresh
//   useEffect(() => {
//     const fetchPoints = async () => {
//       const userId = sessionStorage.getItem('userId');
//       if (!userId) return;

//       try {
//         const response = await fetch(`/user/${userId}`);
//         if (!response.ok) throw new Error('Failed to fetch points');

//         const data = await response.json();
//         setPoints(data.points); // Assuming the response directly contains the points or adjust according to your API response structure
//       } catch (error) {
//         console.error('Error fetching points:', error);
//       }
//     };

//     // if (triggerRefresh) {
//     //   fetchPoints();
//     // }
//   }, [triggerRefresh]);

//   return (
//     <RewardsContext.Provider value={{ points, setPoints, triggerRefresh, setTriggerRefresh }}>
//       {children}
//     </RewardsContext.Provider>
//   );
// };
