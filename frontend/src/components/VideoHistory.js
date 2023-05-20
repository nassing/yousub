import React from 'react';
import '../css/VideoHistory.css';
import exit from '../resources/exit.png';
import carOnFire from '../resources/videos/car-on-fire.jpg';
import googleSymptoms from '../resources/videos/google-symptoms.jpg';
import knifeMaking from '../resources/videos/knife-making.jpg';
import mkbd from '../resources/videos/mkbd.jpg';
import mrbeast from '../resources/videos/mrbeast.jpg';
import hidden from '../resources/videos/hidden.jpg'

export default function VideoHistory({toggleVideoHistory}) {
  const videoSources = [carOnFire, googleSymptoms, hidden, knifeMaking, mkbd, mrbeast];

  return (
    <div id="video-history">
      <div id="video-history-wrapper">
        <div id="close-video-history">
        <img src={exit} alt="" onClick={toggleVideoHistory} />
        </div>
        <p id="video-history-text">Watch previous videos!</p>
        <div id="video-history-list">
          {videoSources.map((src, index) => (
            <div className={`video-history-item ${src === hidden ? 'hidden-video-history-item' : ''}`} key={index}>
              {src !== hidden && <img src={src} alt="" />}
              {src === hidden && <img src={hidden} alt="" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}