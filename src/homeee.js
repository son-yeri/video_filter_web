/*
<!DOCTYPE html>
<html>
  <body>
    <!-- 1. 영상이 노출될 영역을 확보한다. 
    	 api가 제대로 작동하면 <div>에 자동으로 <iframe> 태그가 load될 것 이다. -->
    <div id="player"></div>

    <script>
      // 2. 이 코드는 Iframe Player API를 비동기적으로 로드한다. !!필수!!
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. API 코드를 다운로드 받은 다음에 <iframe>을 생성하는 기능 (youtube player도 더불어)
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',  //변경가능-영상 높이
          width: '640',  //변경가능-영상 너비
          videoId: 'M7lc1UVf-VE',  //변경-영상ID
          playerVars: {
          	'rel': 0,    //연관동영상 표시여부(0:표시안함)
            'controls': 0,    //플레이어 컨트롤러 표시여부(0:표시안함)
            'autoplay' : 1,   //자동재생 여부(1:자동재생 함, mute와 함께 설정)
            'mute' : 1,   //음소거여부(1:음소거 함)
            'loop' : 1,    //반복재생여부(1:반복재생 함)
            'playsinline' : 1    //iOS환경에서 전체화면으로 재생하지 않게
            'playlist' : 'M7lc1UVf-VE'   //재생할 영상 리스트
          },
          events: {
            'onReady': onPlayerReady, //onReady 상태일 때 작동하는 function이름
            'onStateChange': onPlayerStateChange //onStateChange 상태일 때 작동하는 function이름
          }
        });
      }

      // 4. API는 비디오 플레이어가 준비되면 아래의 function을 불러올 것이다.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. API는 플레이어의 상태가 변화될 때 아래의 function을 불러올 것이다.
      //    이 function은 비디오가 재생되고 있을 때를 가르킨다.(state=1),
      //    플레이어는 6초 이상 재생되고 정지되어야 한다.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>*/

import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularVideos = async () => {
        const apiKey = '';
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=3&key=${apiKey}`);
        
        // 오류 코드 반환 시, 오류 반환
        if (!response.ok) return new Error('Failed to fetch videos');
        
        const data = await response.json();
        return data;
      };

    fetchPopularVideos().then(results => {
      console.log(results);
      setVideos(results.item)
    })
  }, []);

  useEffect(() => {
    console.log(videos)
    const blob = new Blob([JSON.stringify(videos)], {
      type: "application/json"
    })
    console.log(URL.createObjectURL(blob))
  }, [videos])

  return (
    <div className="container">
      <button type="button" onClick={() => {
        navigate("filtering")
      }}>필터링</button>
      <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
      />
      <button type="button" onClick={(ev) => {
        // location.href='search'
        navigate("search")
      }}>🔍</button>
      </div>
      <h1>동영상 필터링</h1>
      <div className="video-list">
        {(videos ?? []).map((video) => (
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
