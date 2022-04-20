import React from "react";
import { Route, Redirect } from "react-router-dom";
//Private es un componente que recibe un componente en este caso dashboard, que se le pasa como props en el archivo layout
const Private = ({ component: Component, otherProps }) => {
  const auth = sessionStorage.getItem(
    // "variableque dice que si es true o es false a que estoy ingresado"
  "token");
  return (
    <Route
      {...otherProps}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default Private;
