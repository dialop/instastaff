import { useReducer } from "react";


export const ACTIONS = {
  //Set date for Calendar
  SET_DATE: 'SET_DATE',
  //Adding fake shifts for calendar
  ADD_FAKE_SHIFT: 'ADD_FAKE_SHIFT'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return{
        ...state, 
        date: action.payload
      };
    case ACTIONS.ADD_FAKE_SHIFT:
      return { ...state, 
        fakeShifts: [...state.fakeShifts, action.payload] };
    default:
        return state;
      }
  }


const useApplicationData = () => {
 const initialState = {
  date: new Date(),
  fakeShifts: [
    { date: new Date(2024, 0, 5), title: 'Fake Shift 1', description: 'Description for Shift 1' },
    { date: new Date(2024, 0, 12), title: 'Fake Shift 2', description: 'Description for Shift 2' },
    { date: new Date(2024, 0, 20), title: 'Fake Shift 3', description: 'Description for Shift 3' },
  ]
 }

 const [state, dispatch] = useReducer(reducer, initialState);

 const handleCalendarDate = (selectedDate) => {
  dispatch({ type: ACTIONS.SET_DATE, payload: selectedDate})
 }

 const addShift = (shift) => {
  dispatch({ type: ACTIONS.ADD_FAKE_SHIFT, payload: shift });
};

const getShiftForDate = (date) => {
  return state.fakeShifts.filter((shift) => shift.date.toDateString() === date.toDateString());
};

 return{
  state,
  handleCalendarDate,
  addShift,
  getShiftForDate
 }
}

export default useApplicationData;