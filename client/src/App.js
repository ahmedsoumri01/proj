import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import UserInterface from "pages/userInterface/UserInterface";
import Login from "./authentication/sign-in/Login";
import HandleSignUp from "./authentication/sign-up/HandleSignUp";
import ForgotPassword from "./authentication/reset-password/ForgotPassword";
import AppAdmin from "admin/AppAdmin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign_up" element={<HandleSignUp />} />
        <Route path="/admin_Dashboard" element={<HandleSignUp />} />
        <Route path="/reset_password" element={<ForgotPassword />} />
        <Route path="/UserInterface/client" element={<UserInterface />} />
        <Route path="/UserInterface/admin" element={<UserInterface />} />
      </Routes>
    </div>
  );
}

export default App;
