import React from "react";
import '../styles/video.css';
import videoImg from '../img/videoBG.png';
import myVideo from '../img/observVideo.mp4'

function Video() {
  //upload comment

  return (
      <>
      <img src={videoImg} alt="bg" className="video-bg"/>
      <div className="video-container">
        <p className="video-date">2023-09-18</p>
        <video className="ObVideo" controls>
          <source src={myVideo} type="video/mp4"/>
        </video>
      </div>
      <p className="uploaded-comment">등록한 코멘트 입니다. 지구 관측</p>
      </>
        
  )
}

export default Video;
