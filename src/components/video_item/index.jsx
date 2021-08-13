import React from 'react';

const VideoItem = ({ video }) => {
  return <h2>{video.snippet.title}</h2>;
};

export default VideoItem;
