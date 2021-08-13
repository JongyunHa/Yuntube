import React, { useCallback, useEffect, useState } from 'react';
import VideoList from './components/video_list';
import SearchHeader from './components/search_header';
import styles from './app.module.css';
import Youtube from './service/youtube';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const search = async (query) => {
    const data = await youtube.search(query);
    setVideos(data);
  };

  const getYoutubeVideos = useCallback(async () => {
    const data = await youtube.mostPopular();
    setVideos(data);
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
