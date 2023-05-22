import React, { useEffect } from 'react';
import '../css/VideoPlayer.css';

export default function VideoPlayer({ videoLink, getNewVideo }) {
  useEffect(() => {
    getNewVideo();
  }, [getNewVideo]);

  return (
    <div id="video-player-wrapper">
      <div id="video-player">
        <video src={videoLink} controls loop />
      </div>
    </div>
  );
}

