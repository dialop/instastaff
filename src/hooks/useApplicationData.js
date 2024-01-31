import { useReducer, useEffect } from "react";

export const ACTIONS = {
  SET_DATE: 'SET_DATE',
  SHIFTS_BY_USER: 'SHIFTS_BY_USER',
  SET_JOB_POSTINGS: 'SET_JOB_POSTINGS',
  SET_SELECTED_JOB: 'SET_SELECTED_JOB',
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
    case ACTIONS.SET_SELECTED_JOB:
      return {
        ...state,
        selectedJob: action.payload,
      };
    default:
      return state;
      
  }
}

const useApplicationData = () => {
  const initialState = {
    date: new Date(),
    shiftsByUser: [],
    jobPostings: [],
    selectedJob: null, 
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/calendar')
      .then((response) => response.json())
      .then((data) => dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: data }))
      .catch((error) => {
        console.log('Error fetching shifts', error);
      });
  }, []);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Job Postings:", data); 
        dispatch({ type: ACTIONS.SET_JOB_POSTINGS, payload: data });
      })
      .catch(err => console.error(err));
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

  const bookShift = async (job) => {
    try {
      const response = await fetch(`/api/book-shift/${job.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        const updatedShifts = await response.json();
        dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: updatedShifts });
      } else {
        console.error('Failed to book shift:', await response.text());
      }
    } catch (error) {
      console.error('Error booking shift:', error);
    }
  };

  const handleBookJob = (job) => {
    bookShift(job);
  };

  return {
    state,
    handleCalendarDate,
    getShiftForDate,
    handleBookJob,
  };
};

export default useApplicationData;
