import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState} from 'react';
import Login from './Login';
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
