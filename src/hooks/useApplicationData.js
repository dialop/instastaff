import { useReducer, useEffect } from "react";


export const ACTIONS = {
  //Set date for Calendar
  SET_DATE: 'SET_DATE',

  SHIFTS_BY_USER: 'SHIFTS_BY_USER'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return{
        ...state, 
        date: action.payload
      };
    case ACTIONS.SHIFTS_BY_USER:
      return {
        ...state,
        shiftsByUser: action.payload,
      };
      
    default:
        return state;
      }

  }


const useApplicationData = () => {
 const initialState = {
  date: new Date(),
  shiftsByUser: []
 }

 const [state, dispatch] = useReducer(reducer, initialState);

 useEffect(() => {
  //Fetch shifts by id
  fetch('/calendar')
    .then((response) => response.json())
    .then((data) => dispatch({ type: ACTIONS.SHIFTS_BY_USER, payload: data }))
    .catch((error) => {
      console.log('Error fetching shifts', error);
    });
}, []);

 const handleCalendarDate = (selectedDate) => {
  dispatch({ type: ACTIONS.SET_DATE, payload: selectedDate})
 }

const getShiftForDate = (date) => {
  // Format the date as 'YYYY-MM-DD'
  const formattedDate = date.toISOString().split('T')[0]; 

  return state.shiftsByUser.filter(
    (shift) => shift.shift_date && shift.shift_date.split('T')[0] === formattedDate
  );
};

 return{
  state,
  handleCalendarDate,
  getShiftForDate
 }
}

export default useApplicationData;