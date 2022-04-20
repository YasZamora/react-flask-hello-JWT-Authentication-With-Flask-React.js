import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Signup from "./signup.js";
import Login from "./login.js";
import {Form, Button} from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";




export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<Redirect to="/signup"/> 
		
		</>
	);
};
