import React, { useState } from "react";
// import { LoaderTargetPlugin } from "webpack";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");
  console.log(password);
  const onSubmitHandler = async () => {
    sessionStorage.setItem("email", email);
    // sessionStorage.setItem("password", password);
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      // MODIFICAR ACA
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("_".repeat(80));
    console.log(data);
    if (response.ok == false) {
      setErrormessage(
        "Su usuario no está registrado en plataforma, o bien se ha equivocado en su contraseña"
      );
    } else {
      sessionStorage.setItem("token", data.access_token); //Código para enviar a otra vista
    }

    // .then(resp =>  { console.log(resp.json)
    //   return resp.json()})
    // .then(data => {console.log
    //   return data()})
    // .then(data => setStore({ message: data.message }))
    // .catch(error => console.log("Error loading message from backend", error));
  };
  return [
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <p>{errormessage}</p>
      <Button variant="primary" onClick={onSubmitHandler}>
        Login
      </Button>
    </Form>,
  ];
};
export default Login;
