import React from "react";
import './video.css';

function Video() {
    return (
        <>
        <img src="img/videoBG.png" alt="bg" className="video-bg"/>
        <div className="video-container">
          <p className="video-date">2023-09-15</p>
          <video className="ObVideo" controls>
            <source src="img/observVideo.mp4" type="video/mp4"/>
          </video>
        </div>
        <p className="uploaded-comment">등록한 코멘트 입니다. 지구 관측</p>
        </>
        
    )
}

export default Video;
