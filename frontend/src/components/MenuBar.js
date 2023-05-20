import '../css/MenuBar.css';
import React from 'react';
import logo from '../resources/logo.png';

export default function MenuBar({ toggleVideoHistory, logout }) {
  return (
    <div id="menu-bar">
      <div id="menu-bar-rules" class="tooltip">
        <p>Rules</p>
        <ul class="tooltip-content">
          <li>Listen to the video</li>
          <li>Write down what the person says</li>
          <li>Letter case and punctuation does not matter</li>
          <li>You have as many tries as you need</li>
          <li>No contractions</li>
          <li>Write the numbers in words</li>
        </ul>
      </div>
      <div id="yousub">
        <img src={`${logo}?${new Date().getTime()}`} alt="Logo" />
        <p>yousub.</p>
      </div>
      <div id="menu-bar-right" style={{ marginRight: "1rem" }}>
        <p id="menu-bar-history" onClick={toggleVideoHistory}>History</p>
        <div id="menu-bar-logout" onClick={logout}>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}