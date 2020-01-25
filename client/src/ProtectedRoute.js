import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./context";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isAuth }
  } = useAuth();

  return (
    <Route
      render={props =>
        !isAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
