import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import { Form, Button } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("")
  console.log(password)
  let history = useHistory();
  const onSubmitHandler = async () => {
    sessionStorage.setItem("email", email);
    // sessionStorage.setItem("password", password);
    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
      body:JSON.stringify({
        "email":email,
        "password":password
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

    })
      const data = await response.json()
      if (response.ok == false) {
        setErrormessage("Su usuario ya está registrado en plataforma") 
      }
      else 
      {setErrormessage("Su usuario se ha creado con éxito")
      history.push("/login");}

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
        <Form.Control type="password" placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <p>{errormessage}</p>  
      <Button variant="primary" onClick={onSubmitHandler}>
        Submit
      </Button>
    </Form>,
  ];
};
export default Signup;
