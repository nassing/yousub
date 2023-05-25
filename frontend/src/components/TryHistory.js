import '../css/TryHistory.css';
import React from 'react';

export default function TryHistory({correctHistory, incorrectHistory, currentTryIndex, setCurrentTryIndex}) {

  function handleLeft() {
    if(correctHistory.length !== 0) {
      setCurrentTryIndex(currentTryIndex === 0 ? correctHistory.length - 1 : currentTryIndex - 1)
    }
  };

  function handleRight() {
    if(correctHistory.length !== 0) {
      setCurrentTryIndex(currentTryIndex === correctHistory.length - 1 ? 0 : currentTryIndex + 1)
    }
  };
  
  let currentCorrectItem = correctHistory === [] ? "" : correctHistory[currentTryIndex];
  let currentIncorrectItem = incorrectHistory === [] ? "" : incorrectHistory[currentTryIndex];

  return (
    <div id="try-history-wrapper">
      <div id="try-history">
        <div id="try-history-main">
          <p className="try-history-arrow" onClick={() => handleLeft()}>{'<'}</p>
          <div id="try-history-item">
            <p><span id="try-history-item-correct">{currentCorrectItem}</span><span id="try-history-item-incorrect">{currentIncorrectItem}</span></p>
          </div>
          <p className="try-history-arrow" onClick={() => handleRight()}>{'>'}</p>
        </div>
        <div id="try-history-pages-number">
          <p>{`${correctHistory.length === 0 ? 0 : currentTryIndex + 1}/${correctHistory.length}`}</p>
        </div>
      </div>
    </div>
  );
}
