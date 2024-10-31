import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc, poster, fallbackImage }) => {
  return (
    <div className="video-container">
      <div className="video-player">
        <video
          autoPlay
          muted
          loop
          controls
          poster={poster}
          className="video-element"
        >
          <source src={videoSrc} type="video/webm" />
          <img src={fallbackImage} alt="Video not supported" className="fallback-image" />
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
