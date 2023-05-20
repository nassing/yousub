import '../css/TrHistory.css';
import React from 'react';

export default function History(correctHistory, incorrectHistory) {
  const [currentIndex, setCurrentIndex] = useState('');

  function handleLeft() {
    setCurrentIndex(currentIndex === 0 ? correctHistory.length - 1 : currentIndex - 1);
  };

  function handleRight() {
    setCurrentIndex(currentIndex === correctHistory.length - 1 ? 0 : currentIndex + 1);
  };
  
  const currentCorrectItem = correctHistory[currentIndex];
  const currentIncorrectItem = incorrectHistory[currentIndex];
  return (
    <div id="history-wrapper">
      <div id="history">
        <div id="history-main">
          <p onClick={handleLeft}>{'<'}</p>
          <div id="history-item">
            <p id="history-item-correct">{currentCorrectItem}</p>
            <p id="history-item-incorrect">{currentIncorrectItem}</p>
          </div>
          <p onClick={handleRight}>{'>'}</p>
        </div>
        <div id="history-pages-number">
          <p>{`${currentIndex + 1}/${correctHistory.length}`}</p>
        </div>
      </div>
    </div>
  );
}
