// - MAIN APP COMPONENT - //

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';

function Home() {
  return (
    <div>
      {/* Home page content */}
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
