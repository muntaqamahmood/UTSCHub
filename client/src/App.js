import React from "react";
import { BrowserRouter, Routes, Route, NavLink, } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink activeclassname="active" to="/">Login</NavLink>
          <NavLink activeclassname="active" to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
