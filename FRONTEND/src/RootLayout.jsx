import React from "react";
import HomePage from "./pages/homePage.jsx";
import LoginForm from "./components/loginForm.jsx";
import AuthPage from "./pages/authPage.jsx";
import { Outlet } from "@tanstack/react-router";
import NavBar from "./components/NavBar.jsx";

const RootLayout = () => {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default RootLayout