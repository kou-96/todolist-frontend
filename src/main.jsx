import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LoginForm from "./components/LoginFrom.jsx";
import SignupForm from "./components/SignupForm.jsx";
import SignupSuccess from "./components/SignupSuccess.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
        <Route path="/:username" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
