import React, {useState, useEffect} from 'react';
import '../css/VideoPlayer.css';
import CarOnFire from '../resources/videos/car-on-fire.mp4';
import GoogleSymptoms from '../resources/videos/google-symptoms.mp4';
import KnifeMaking from '../resources/videos/knife-making.mp4';
import Mkbd from '../resources/videos/mkbd.mp4';
import MrBeast from '../resources/videos/mrbeast.mp4';

const videoLinks = {
  "car-on-fire.mp4": CarOnFire,
  "google-symptoms.mp4": GoogleSymptoms,
  "knife-making.mp4": KnifeMaking,
  "mkbd.mp4": Mkbd,
  "mrbeast.mp4": MrBeast
};

export default function VideoPlayer({ videoLink }) {
  const [videoSource, setVideoSource] = useState('');

  useEffect(() => {
    setVideoSource(videoLinks[videoLink]);
  }, [videoLink]);

  return (
    <div id="video-player-wrapper">
      <div id="video-player">
        <video src={videoSource} controls loop />
      </div>
    </div>
  );
}
