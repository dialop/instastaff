import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const updatePointsBackend = async (newPoints) => {
    const userId = sessionStorage.getItem('userId');
    console.log(`Updating points for user ${userId} with ${newPoints} new points.`);
    if (!userId) {
      console.log('No userId found in sessionStorage.');
      return null;
    }
  
    try {
      const response = await fetch(`/user/${userId}/points`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pointsToAdd: newPoints }),
      });
  
      if (!response.ok) throw new Error('Failed to update points');
  
      const data = await response.json();
      console.log(`Points updated successfully. New total: ${data.points}`);
      return data.points;
    } catch (error) {
      console.error('Error updating points:', error);
      return null;
    }
  };
  
  const addPoints = async (newPoints, showToast = true) => {
    console.log(`Adding ${newPoints} points...`);
    const updatedPoints = await updatePointsBackend(newPoints);
    if (updatedPoints !== null) {
      setPoints(updatedPoints);
      console.log(`Points added successfully. Total points: ${updatedPoints}`);
  
      if (showToast) {
        toast.success(`You got ${newPoints} points! Total earned: ${updatedPoints}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      console.log('Failed to add points.');
    }
  };  

  const removePoints = async (pointsToRemove, showToast = true) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('No userId found in sessionStorage for removing points.');
      return;
    }
  
    console.log(`Removing ${pointsToRemove} points for user ${userId}.`);
    try {
      const response = await fetch(`/user/${userId}/points`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ensure your backend supports deducting points
        body: JSON.stringify({ pointsToAdd: -pointsToRemove }),
      });
  
      if (!response.ok) throw new Error('Failed to update points');
  
      const data = await response.json();
      console.log(`Points removed successfully. New total: ${data.points}`);
      setPoints(data.points);
  
      if (showToast) {
        toast.error(`You lost ${pointsToRemove} points! Total points: ${data.points}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Error removing points:', error);
    }
};

  useEffect(() => {
    const fetchPoints = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch points');

        const data = await response.json();
        setPoints(data.points || 0);
      } catch (error) {
        console.error('Error fetching points:', error);
        setPoints(0);
      }
    };

    fetchPoints();
  }, [triggerRefresh]);

  return (
    <RewardsContext.Provider value={{ points, setPoints, triggerRefresh, setTriggerRefresh, addPoints, removePoints }}>
      {children}
    </RewardsContext.Provider>
  );
};

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const RewardsContext = createContext();

// export const useRewards = () => useContext(RewardsContext);

// export const RewardsProvider = ({ children }) => {
//   const [points, setPoints] = useState(0);
//   const [triggerRefresh, setTriggerRefresh] = useState(false);

//   const addPoints = (newPoints, showToast = true) => {
//     setPoints(prevPoints => {
//       const updatedPoints = prevPoints + newPoints;
//       if (showToast) {
//         toast.success(`You got ${newPoints} points! Total earned: ${updatedPoints}`, {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//       return updatedPoints;
//     });
//   };

//   useEffect(() => {
//     const fetchPoints = async () => {
//       const userId = sessionStorage.getItem('userId');
//       if (!userId) return;

//       try {
//         const response = await fetch(`/user/${userId}`);
//         if (!response.ok) throw new Error('Failed to fetch points');

//         const data = await response.json();
//         setPoints(data.points);
//       } catch (error) {
//         console.error('Error fetching points:', error);
//       }
//     };

//     fetchPoints();
//   }, [triggerRefresh]); 

//   return (
//     <RewardsContext.Provider value={{ points, setPoints, triggerRefresh, setTriggerRefresh, addPoints }}>
//       {children}
//     </RewardsContext.Provider>
//   );
// };