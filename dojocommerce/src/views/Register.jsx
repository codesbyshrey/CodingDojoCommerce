import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/register", { firstName, lastName, email, password, confirmPassword })
      .then((res) => {
        console.log(res.data);
        // do something after successful registration
        navigate("/test/login")
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate("/")
      });
  };

  return (
    <div className="registrationform">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <Link to="/test/login"> Already Have an Account? Login </Link>
    </div>
  );
};

export default Register;
