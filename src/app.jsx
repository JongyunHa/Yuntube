import React, { useCallback, useEffect, useState } from 'react';
import SearchHeader from './components/search_header';
import VideoDetail from './components/video_detail';
import styles from './app.module.css';
import VideoList from './components/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSeletedVideo] = useState(null);
  const search = async (query) => {
    const data = await youtube.search(query);
    setVideos(data);
  };

  const getYoutubeVideos = useCallback(async () => {
    const data = await youtube.mostPopular();
    setVideos(data);
  }, []);

  const selectVideo = useCallback(
    (video) => {
      setSeletedVideo(video);
    },
    [videos],
  );

  useEffect(() => {
    getYoutubeVideos();
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader search={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
          ;
        </div>
      </section>
    </div>
  );
}

export default App;
