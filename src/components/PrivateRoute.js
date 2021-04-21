import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

export const PrivateRoute = ({ component: Component }) => {
  const location = useLocation();

  const token = window.localStorage.getItem("token");

  return token ? (
    <Route location={location} component={Component} />
  ) : (
    <Redirect
      to={{ pathname: "/sign-in", state: { from: location.pathname } }}
    />
  );
};
