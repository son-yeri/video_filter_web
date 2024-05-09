import React, { useEffect, useState } from 'react';

const CNNM = ({ videoIds, titles, categories }) => {
  useEffect(() => {
    // YouTube API 로드
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YouTube API가 준비되면 플레이어 생성
    window.onYouTubeIframeAPIReady = () => {
      videoIds.forEach(videoId => {
        new window.YT.Player(`youtube-player-${videoId}`, {
          height: '360',
          width: '640',
          videoId: videoId,
          playerVars: {
            // 동영상 재생 옵션들
          },
          events: {
            // 플레이어 이벤트 처리
          },
        });
        console.log('${titles[index]}, ${categories[index]}')
      });
    };
  }, [videoIds, titles, categories]);

  return (
    <div>


         {/* 검색 입력란 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요"
      />
      <button>&rarr;</button>
      <button type="button" onClick="location.href='filtering.js'">필터링 설정</button>


      {videoIds.map((videoId, index) => (
        <div key={videoId}>
             {/*동영상 플레이*/}
            <div id={`youtube-player-${videoId}`}></div>
                {/*동영사 플레이*/}
                <div>{titles[index]}</div> 
                <div>{categories[index]}</div>
            </div>
      ))}
    </div>
  );
};

export default CNNM;


