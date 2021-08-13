import React, { useCallback, useEffect, useState } from 'react';
import VideoList from './components/video_list';
import SearchHeader from './components/search_header';
import styles from './app.module.css';

function App() {
  const [videos, setVideos] = useState([]);
  const search = (query) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(url)
      .then((response) => response.json())
      .then((result) =>
        Array.from(result.items).map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
      )
      .then((result) => setVideos(result))
      .catch((error) => console.log('error', error));
  };

  const getYoutubeVideos = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    getYoutubeVideos();
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader search={search} />
      <VideoList videos={videos} />;
    </div>
  );
}

export default App;
