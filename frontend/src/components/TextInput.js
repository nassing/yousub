import '../css/TextInput.css';
import React, {useState} from 'react';

export default function TextInput({username, videoLink}) {
  const [userInput, setUserInput] = useState('');

  function handleInput(event) {
    setUserInput(event.target.value);
  }

  function handleSubmit() {
    if(username === null || videoLink === null || username === '' || videoLink === '')
    {
      return ;
    }

    const data = {
      username: username,
      videoLink: videoLink,
      userInput: userInput
    };
    
    fetch(process.env.REACT_APP_API_URL + 'input', {
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
            setUserInput('');     
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

  return(
  <div id="text-input-wrapper">
    <textarea
      placeholder="Enter your text here..."
      value={userInput}
      onChange={handleInput}
      autocomplete="off"
      autofocus
      rows="3"
    /> 
    <button onClick={() => handleSubmit()}>Submit</button>
  </div>);
}