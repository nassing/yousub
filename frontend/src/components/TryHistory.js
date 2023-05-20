import '../css/TryHistory.css';
import React, {useState} from 'react';

export default function TryHistory() {
  const[correctHistory, setCorrectHistory] = useState(['This is ', 'Another ', 'One correct answer ', '']);
  const[incorrectHistory, setIncorrectHistory] = useState(['An example of answer', 'example', '', 'One wrong answer']);
  const[currentIndex, setCurrentIndex] = useState(0);

  
  // getHistory = (username, videoLink) => ({})

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
  return (
    <div id="try-history-wrapper">
      <div id="try-history">
        <div id="try-history-main">
          <p onClick={this.handleLeft}>{'<'}</p>
          <div id="try-history-item">
            <p id="try-history-item-correct">{currentCorrectItem}</p>
            <p id="try-history-item-incorrect">{currentIncorrectItem}</p>
          </div>
          <p onClick={this.handleRight}>{'>'}</p>
        </div>
        <div id="try-history-pages-number">
          <p>{`${currentIndex + 1}/${correctHistory.length}`}</p>
        </div>
      </div>
    </div>
  );
}
