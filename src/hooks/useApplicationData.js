import React, { createContext, useReducer, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ACTIONS = {
  SET_DATE: "SET_DATE",
  SHIFTS_BY_USER: "SHIFTS_BY_USER",
  SET_JOB_POSTINGS: "SET_JOB_POSTINGS",
  SET_SELECTED_JOB: "SET_SELECTED_JOB",
};

const initialState = {
  date: new Date(),
  shiftsByUser: [],
  jobPostings: [],
  selectedJob: null, // store the selected job
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
    default:
      return state;
  }
}

export const useApplicationData = () => {
  const { isAuthenticated, user } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching shifts by user ID
  useEffect(() => {
    fetch("/calendar")
      .then((response) => response.json())
      .then((data) => dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: data }))
      .catch((error) => {
        console.log("Error fetching shifts", error);
      });
  }, []);

  // Fetching job postings
  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Job Postings:", data);
        dispatch({ type: ACTIONS.SET_JOB_POSTINGS, payload: data });
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetching user data
  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/user");
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          setError(error);
          console.error("Error fetching user data:", error);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  const handleCalendarDate = (selectedDate) => {
    dispatch({ type: ACTIONS.SET_DATE, payload: selectedDate });
  };

  const getShiftForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return state.shiftsByUser.filter(
      (shift) =>
        shift.shift_date && shift.shift_date.split("T")[0] === formattedDate
    );
  };

  const setSelectedJob = (job) => {
    dispatch({ type: ACTIONS.SET_SELECTED_JOB, payload: job });
  };

  return {
    state,
    handleCalendarDate,
    getShiftForDate,
    userData,
    isLoading,
    error,
    setSelectedJob,
  };
};


export const ApplicationDataContext = createContext();

export const ApplicationDataProvider = ({ children }) => {
  const { state, setSelectedJob } = useApplicationData();

  return (
    <ApplicationDataContext.Provider
      value={{ selectedJob: state.selectedJob, setSelectedJob }}
    >
      {children}
    </ApplicationDataContext.Provider>
  );
};
