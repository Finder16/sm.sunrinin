import React, {useState} from "react";
import './profile.css';
import profileImage from '../profileImage.webp';
import observationImage from '../observationImage.webp';
import BG from '../profileBG.gif';
import camera from '../camera.webp';
import { Link } from "react-router-dom";

function Profile() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                setSelectedImage(dataURL);
            };
            reader.readAsDataURL(file);
            // 파일 저장하는 코드 짤것?
        };
    }

    return (
        <>
        <img src={BG} alt="background" className="profileBG"/>
        <div className="profileBox">
            <img src={selectedImage || profileImage} alt="profileImage" className="profileImage" />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="imageInput"
            />
            <label htmlFor="imageInput" className="uploadImg">
                <img src={camera} alt="camera" />
            </label>
            <p className="myName">이재영</p>
            {/* <p className="myInfo">자기소개: 이재영입니다.</p>    */}
            <p className="observationDate">관측 날짜: 2023-06-14</p>
            <Link to="/video"><img src={observationImage} alt="observationImage" className="observationImage" /></Link>
            <textarea className="commentContent" />
            <button className="commentButton" placeholder="Write your comment here...">코멘트 등록</button>
        </div>
        </>
        
    )
}

export default Profile;