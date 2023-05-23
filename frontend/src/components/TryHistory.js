import '../css/TryHistory.css';
import React, {useState, useEffect} from 'react';

export default function TryHistory({username, videoLink}) {
  const[correctHistory] = useState(['This is ', 'Another ', 'One correct answer ', '']);
  const[incorrectHistory] = useState(['An example of answer', 'example', '', 'One wrong answer']);
  const[currentIndex] = useState(0);

  
  function getHistory(username, videoLink) {

    const data = {
      username: username,
      videoLink: videoLink
    };

    fetch(process.env.REACT_APP_API_URL + 'getHistory', {
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
      console.log(data);})
    .catch(error => console.log(error.message)); 
  }

  function handleLeft() {
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex === 0 ? prevState.correctHistory.length - 1 : prevState.currentIndex - 1,
    }));
  };

  function handleRight() {
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex === prevState.correctHistory.length - 1 ? 0 : prevState.currentIndex + 1,
    }));
  };
  
  const currentCorrectItem = correctHistory[currentIndex];
  const currentIncorrectItem = incorrectHistory[currentIndex];

  useEffect(() => {
    getHistory(username, videoLink);
  }, [username, videoLink]);

  return (
    <div id="try-history-wrapper">
      <div id="try-history">
        <div id="try-history-main">
          <p onClick={handleLeft}>{'<'}</p>
          <div id="try-history-item">
            <p id="try-history-item-correct">{currentCorrectItem}</p>
            <p id="try-history-item-incorrect">{currentIncorrectItem}</p>
          </div>
          <p onClick={handleRight}>{'>'}</p>
        </div>
        <div id="try-history-pages-number">
          <p>{`${currentIndex + 1}/${correctHistory.length}`}</p>
        </div>
      </div>
    </div>
  );
}
