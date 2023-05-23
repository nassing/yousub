import React, { useState } from 'react';
import '../css/Register.css';
import exit from '../resources/exit.png';

export default function Register({toggleRegister}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(process.env.REACT_APP_API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <div id="register">
      <div id="register-wrapper">
        <img src={exit} alt="" onClick={toggleRegister} />
        <p id="register-text">Join yousub now !</p>
        <form onSubmit={handleSubmit}>
          <label id="register-username">
            <p>Username</p>
            <input type="text" name="username" value={username} onChange={handleUsernameChange} required />
          </label>
          <label id="register-password">
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
          </label>
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}