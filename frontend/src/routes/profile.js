import React from "react";

function Profile() {
    return (
        <div className="profileBox">
            <img src="" alt="profileImage" ></img>
            <p className="myName">이재영</p>
            <p className="myInfo">자기소개 : 이재영 입니다.</p>
            <p className="observationDate">관측 날짜 : 2023-06-14</p>
            <img alt="observationImage"></img>
            <textarea className="commentContent"></textarea>
            <button className="commentButton">코멘트 등록</button>
        </div>
    )
}

export default Profile;