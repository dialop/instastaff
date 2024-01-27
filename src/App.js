// - MAIN COMPONENT - //

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';

function App() {
  useEffect(() => {
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;