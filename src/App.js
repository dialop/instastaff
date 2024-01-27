// import { useEffect, useState } from "react"; // HELLOO
import "./App.css";
import CalendarComponent from "./components/CalendarComponent";
import useApplicationData from "./hooks/useApplicationData";

function App() {

  const {
    state,
    handleCalendarDate,
    addShift,
    getShiftForDate
  } = useApplicationData();

  return (
    <div className="App">
      
      <CalendarComponent 
      state = {state}
      handleCalendarDate = {handleCalendarDate}
      addShift = {addShift}
      getShiftForDate = {getShiftForDate}/>

    </div>
  );
}

export default App;
