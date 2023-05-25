import React, {useState, useEffect} from 'react';

import Head from './components/Head';
import MenuBar from './components/MenuBar';
import VideoPlayer from './components/VideoPlayer';
import TryHistory from './components/TryHistory';
import VideoHistory from './components/VideoHistory';
import TextInput from './components/TextInput';
import Login from './components/Login';
import Source from './components/Source';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showVideoHistory, setShowVideoHistory] = useState(false);
  const [username, setUsername] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [videoSource, setVideoSource] = useState('');

  const[correctHistory, setCorrectHistory] = useState([]);
  const[incorrectHistory, setIncorrectHistory] = useState([]);
  const[currentTryIndex, setCurrentTryIndex] = useState(0);

  function logout() {
    setLoggedIn(false);
    setShowVideoHistory(false);
    setUsername('');
    setVideoLink('');
    setVideoSource('');
  }

  function handleRegister (username, password) {

    if(username === null || password === null || username === '' || password === '')
    {
      return ;
    }

    const data = {
      username: username,
      password: password
    };
    
    fetch(process.env.REACT_APP_API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) { 
        response.text().then(text => {
          if(text === "0") {
            setLoggedIn(true);
            setUsername(username);
          }
          else if(text === "1")
          {
            //Error
          }
        })
      } else {
        throw new Error('Error adding element');
      }
    })
    .catch(error => console.log(error.message));
  }
    

  function handleLogin(username, password) {

    if(username === null || password === null || username === '' || password === '')
    {
      return ;
    }

    const data = {
      username: username,
      password: password
    };
    
    fetch(process.env.REACT_APP_API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        response.text().then(text => {
          if(text === "0") {
            setLoggedIn(true);
            setUsername(username);
          }
          else if(text === "1")
          {
            //Error
          }
        })
      } else {
        throw new Error('Error adding element');
      }
    })
    .catch(error => console.log(error.message));
  }
  
  function getTryHistory(username, videoLink) {

    const data = {
      username: username,
      videoLink: videoLink
    };

    fetch(process.env.REACT_APP_API_URL + 'getTryHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error getting history');
      }
    })
    .then(data => {
      setCorrectHistory(data.correctHistory);
      setIncorrectHistory(data.incorrectHistory);
      if(data.correctHistory.length > 0) {setCurrentTryIndex(data.correctHistory.length - 1);}
    })
    .catch(error => console.log(error.message)); 
  }

  useEffect(() => {
    if (!loggedIn || username === null || username === '') {
      return;
    }

    const data = {
      username: username
    };

    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error getting video');
        }
      })
      .then(data => {
        setVideoLink(data.link);
        setVideoSource(data.source);
        getTryHistory(username, data.link);
      })
      .catch(error => console.log(error.message)
    );
  }, [loggedIn, username]);

  if (!loggedIn) {
    return (
      <>
        <Login handleLogin={handleLogin} handleRegister={handleRegister} />
     </>
    )
  } else {
    return (
      <>
        <Head />
        <MenuBar setShowVideoHistory={setShowVideoHistory} logout={logout}/>
        <VideoPlayer videoLink={videoLink}/>
        <TryHistory correctHistory={correctHistory} incorrectHistory={incorrectHistory} currentTryIndex={currentTryIndex} setCurrentTryIndex={setCurrentTryIndex}/>
        <TextInput videoLink={videoLink} username={username} getTryHistory={getTryHistory}/>
        <Source sourceLink={videoSource}/>
        {showVideoHistory ? <VideoHistory setShowVideoHistory={setShowVideoHistory}/> : null}
      </>
    );
  }
}