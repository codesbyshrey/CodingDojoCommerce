import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/login", { email, password })
      .then((res) => {
        console.log(res.data);
        navigate("/")
        // do something after successful login
      })
      .catch((err) => {
        console.log(err.response.data);
        // handle error messages
      });
  };

  return (
    <div className="registrationform">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-success" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
