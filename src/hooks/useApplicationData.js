import { useReducer, useEffect, useState } from "react";

export const ACTIONS = {
  SET_DATE: 'SET_DATE',
  SHIFTS_BY_USER: 'SHIFTS_BY_USER',
  SET_JOB_POSTINGS: 'SET_JOB_POSTINGS'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return {
        ...state, 
        date: action.payload
      };
    case ACTIONS.SHIFTS_BY_USER:
      return {
        ...state,
        shiftsByUser: action.payload,
      };
    case ACTIONS.SET_JOB_POSTINGS:
      return {
        ...state,
        jobPostings: action.payload
      };
    default:
      return state;
  }
}

export const useApplicationData = () => {
  const initialState = {
    date: new Date(),
    shiftsByUser: [],
    jobPostings: [] 
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching shifts by user ID
  useEffect(() => {
    fetch('/calendar')
      .then((response) => response.json())
      .then((data) => dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: data }))
      .catch((error) => {
        console.log('Error fetching shifts', error);
      });
  }, []);

  // Fetching job postings
  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Job Postings:", data);
        dispatch({ type: ACTIONS.SET_JOB_POSTINGS, payload: data });
      })
      .catch(err => console.error(err));
  }, []);

  // Fetching user data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching user data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleCalendarDate = (selectedDate) => {
    dispatch({ type: ACTIONS.SET_DATE, payload: selectedDate });
  };

  const getShiftForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; 
    return state.shiftsByUser.filter(
      (shift) => shift.shift_date && shift.shift_date.split('T')[0] === formattedDate
    );
  };

  return {
    state,
    handleCalendarDate,
    getShiftForDate,
    userData,
    isLoading,
    error
  };
};

export default useApplicationData;
