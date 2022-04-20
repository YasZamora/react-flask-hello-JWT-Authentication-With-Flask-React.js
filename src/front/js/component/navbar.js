import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  let history = useHistory();
  const logoutHandler = () => {
    // const token = sessionStorage.getItem("token");
    // const response = fetch(process.env.BACKEND_URL + "/api/logout", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "aplication/json",
    //     Authorization: "Bearer " + token,
    //   },
    // });
    sessionStorage.clear();
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {/* <Link to="/login"> */}
          <button className="btn btn-primary" onClick={logoutHandler}>
            Logout
          </button>
          {/* </Link> */}
        </div>
      </div>
    </nav>
  );
};
