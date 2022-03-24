import { Route, Redirect } from "react-router-dom";
const Privado = ({ component: Component, otherProps }) => {
  const auth = sessionStorage.getItem(
    "variableque dice que si es true o es false a que estoy ingresado"
  );
  return (
    <Route
      {...otherProps}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default Privado;
