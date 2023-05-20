import React, { useState } from 'react';

import '../css/Login.css';
import logo from '../resources/logo.png';

export default function Login({handleLogin, handleRegister}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div id="login">
      <div id="login-logo">
        <img src={logo} alt=""></img>
      </div>
      <div id="login-title">
        <p>yousub.</p>
      </div>
      <div id="login-wrapper">
        <p id="login-text">Welcome back !</p>
        <div id="login-form">
          <label id="login-username">
            <p>Username</p>
            <input type="text" name="username" value={username} onChange={handleUsernameChange} required />
          </label>
          <label id="login-password">
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
          </label>
          <br />
          
          <div id="submit-buttons">
            <input onClick={() => handleRegister(username, password)} type="submit" value="Register" />
            <input onClick={() => handleLogin(username, password)} type="submit" value="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}