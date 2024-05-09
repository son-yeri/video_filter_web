import React, { useEffect, useState } from 'react';

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPopularVideos = async () => {
      try {
        const apiKey = '';
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=3&key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching popular videos:', error);
      }
    };

    fetchPopularVideos();
  }, []);



  return (
    <div className="container">
      <button type="button" onClick="location.href='filtering.js'">필터링</button>
      <h1>동영상 필터링</h1>
      <div className="video-list">
        {videos.map((video) => (
          <div className="video" key={video.id}>
            <div className="video-info">
              <h2>{video.snippet.title}</h2>
              <p>{video.snippet.description}</p>
            </div>
            <div className="video-wrapper">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              
            </div>
            {/*<p>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
        </p>*/}
          </div>
        ))}
      </div>
    </div>
  );

};

export default YouTubeVideos;