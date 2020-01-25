import React from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../context";
import Login from "../components/Auth/Login";

const Splash = () => {
  const {
    state: { isAuth }
  } = useAuth();

  return isAuth ? <Redirect to="/" /> : <Login />;
};

export default Splash;
