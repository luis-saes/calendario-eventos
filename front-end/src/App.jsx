import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./views/LoginScreen";
import MainScreen from "./views/MainScreen";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/calendar" element={<MainScreen />} />
      </Routes>
    </div>
  );
};

export default App;
