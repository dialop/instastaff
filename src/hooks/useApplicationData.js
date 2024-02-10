// -- APPLICATION DATA MANAGEMENT --//

import { createContext, useReducer, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ACTIONS = {
  SET_DATE: "SET_DATE",
  SHIFTS_BY_USER: "SHIFTS_BY_USER",
  SET_JOB_POSTINGS: "SET_JOB_POSTINGS",
  SET_SELECTED_JOB: "SET_SELECTED_JOB",
  ADD_SHIFT: "ADD_SHIFT", // Book: New action for adding a shift
  ADD_CALENDAR_ENTRY: "ADD_CALENDAR_ENTRY", // Book: calendar 
};

const initialState = {
  date: new Date(),
  shiftsByUser: [],
  jobPostings: [],
  selectedJob: null,
  calendarEntries: [], // Book: calendarEntries array in the state

};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case ACTIONS.SHIFTS_BY_USER:
      return {
        ...state,
        shiftsByUser: action.payload,
      };
    case ACTIONS.SET_JOB_POSTINGS:
      return {
        ...state,
        jobPostings: action.payload,
      };
    case ACTIONS.SET_SELECTED_JOB:
      return {
        ...state,
        selectedJob: action.payload,
      };
      case ACTIONS.ADD_SHIFT:
        return {
          ...state,
          shiftsByUser: [...state.shiftsByUser, action.payload],
        };

        // case ACTIONS.CANCEL_JOB:
        //   return {
        //     ...state,
        //     shiftsByUser: state.shiftsByUser.filter(shift => shift.id !== action.payload)
        //   };
    default:
      return state;
  }
}

export const useApplicationData = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();  // added debugging booking
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        if (isAuthenticated) {
          setIsLoading(true);
          const userId = window.sessionStorage.getItem('userId');
          const response = await fetch(`/calendar/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch calendar data");
          }
          const data = await response.json();
          dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: data });
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching calendar data:", error);
        setIsLoading(false);
      }
    };
  
    fetchCalendarData();
  }, [isAuthenticated, user]);

  

  // useEffect(() => {
  //   fetch("/calendar")
  //     .then((response) => response.json())
  //     .then((data) => dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: data }))
  //     .catch((error) => {
  //       //console.log("Error fetching shifts", error);
  //     });
  // }, []);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        //console.log("Fetched Job Postings:", data);
        dispatch({ type: ACTIONS.SET_JOB_POSTINGS, payload: data });
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //       console.log(isAuthenticated && user);

  //       const userId = window.sessionStorage.getItem('userId')
  //       console.log(userId);
        
  //     if (isAuthenticated && user) {
  //       setIsLoading(true);
  //       try {
  //         console.log("fire");
  //         const response = await fetch("/api/user");
  //         const data = await response.json();
  //         setUserData(data);
  //       } catch (error) {
  //         setError(error);
  //         console.error("Error fetching user data:", error);
  //       }
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [isAuthenticated, user]);

  const handleCalendarDate = (selectedDate) => {
    dispatch({ type: ACTIONS.SET_DATE, payload: selectedDate });
  };

 const getShiftForDate = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  if (Array.isArray(state.shiftsByUser)) { // Ensure state.shiftsByUser is an array
    return state.shiftsByUser.filter(
      (shift) => shift.shift_date && shift.shift_date.split("T")[0] === formattedDate
    );
  }
  return []; // If state.shiftsByUser is not an array, return an empty array
};



  // const handleCancelShift = (jobId) => {
  //   dispatch({ type: ACTIONS.CANCEL_JOB, payload: jobId });
  // };

  const setSelectedJob = (job) => {
    dispatch({ type: ACTIONS.SET_SELECTED_JOB, payload: job });
  };

  // Book: Function to add a new shift
  const addShift = (newShift) => {
    dispatch({ type: ACTIONS.ADD_SHIFT, payload: newShift });
  };


  // Book: Function to add a new shift to calendar
  const addCalendarEntry = (newEntry) => {
    dispatch({ type: ACTIONS.ADD_CALENDAR_ENTRY, payload: newEntry });
  };

  return {
    state,
    handleCalendarDate,
    getShiftForDate,
    userData,
    isLoading,
    error,
    setSelectedJob,
    addShift, // Book
    addCalendarEntry, // Book
  };
};

export const ApplicationDataContext = createContext();

export const ApplicationDataProvider = ({ children }) => {
  const applicationData = useApplicationData();
  // useApplicationData returns an object that includes addCalendarEntry, state, and any other functions or state variables you need

  return (
    <ApplicationDataContext.Provider value={applicationData}>
      {children}
    </ApplicationDataContext.Provider>
  );
};
