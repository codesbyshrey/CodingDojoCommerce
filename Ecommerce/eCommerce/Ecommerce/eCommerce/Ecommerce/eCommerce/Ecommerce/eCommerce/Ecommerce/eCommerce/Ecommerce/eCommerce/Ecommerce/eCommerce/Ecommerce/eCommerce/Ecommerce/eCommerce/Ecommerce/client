import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:8000/api/register', { firstName, lastName, email, password, confirmPassword })
      .then(response => {
        console.log(response.data); // handle successful registration
      })
      .catch(error => {
        console.log(error.response.data); // handle error
      });
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input type="text" id="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input type="text" id="lastName" value={lastName} onChange={event => setLastName(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
