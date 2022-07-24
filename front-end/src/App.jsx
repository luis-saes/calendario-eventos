import React from "react";
import "./App.css";
import { AuthProvider } from "./helpers/Auth";
import { RequireAuth } from "./helpers/RequireAuth";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./views/LoginScreen";
import MainScreen from "./views/MainScreen";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <MainScreen />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
