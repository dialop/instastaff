// import { useEffect, useState } from "react"; // HELLOO
import "./App.css";
import CalendarComponent from "./components/CalendarComponent";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   getMessage();
  // }, []);

  // async function getMessage() {
  //   const result = await fetch("/api/message");
  //   const json = await result.json();

  //   setMessage(json);
  // }

  return (
    <div className="App">
      
      <CalendarComponent />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
