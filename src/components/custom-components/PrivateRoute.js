import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('isLoggedIn') ? (
        // true ?(
        <Component {...props} />
      ) : (
        <Redirect to={`/auth/absen`} />
        // <Component {...props} />
      )
    }
  />
);

export default PrivateRoute;