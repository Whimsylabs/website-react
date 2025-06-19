import React, { useState } from 'react';
import './VideoPlayer.css';

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/9-L9i1ljEMk?autoplay=1&mute=1&loop=1&playlist=9-L9i1ljEMk";

const VideoPlayer = ({ videoSrc, poster, fallbackImage }) => {
  const [ytFailed, setYtFailed] = useState(false);

  return (
    <div className="video-container">
      <div className="video-player">
        {!ytFailed ? (
          <iframe
            className="video-element"
            src={YOUTUBE_EMBED_URL}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onError={() => setYtFailed(true)}
            aria-labelledby="video-title"
            width="100%"
            height="100%"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            controls
            poster={poster}
            className="video-element"
            aria-labelledby="video-title"
          >
            <source src={videoSrc} type="video/webm" />
            {fallbackImage && (
              <img src={fallbackImage} alt="Video not supported. Fallback image displayed." className="fallback-image" />
            )}
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;