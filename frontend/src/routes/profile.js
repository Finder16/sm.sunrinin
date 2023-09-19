import React, {useState} from "react";
import '../styles/profile.css';
import profileImage from '../img/profileImage.webp';
import observationImage from '../img/observationImage.webp';
import BG from '../img/profileBG.gif';
import camera from '../img/camera.webp';
import { Link } from "react-router-dom";
import { me } from "../api";
import { useNavigate } from "react-router-dom";


function Profile() {
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate()

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                setSelectedImage(dataURL);
            };
            reader.readAsDataURL(file);
        };
    }

    React.useEffect(() => {
        me().then((res) => {
            setUser(res);
        }).catch((err) => {
            navigate("/login");
        });
    }, []);

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
            <p className="myName">{user?.username}</p>
            <p className="myInfo">{user?.introduce ?? "작성 안됨"}</p>   
            <p className="observationDate">관측 날짜: 2023-09-18</p>
            <Link to="/video"><img src={observationImage} alt="observationImage" className="observationImage" /></Link>
            <textarea className="commentContent" />
            <button className="commentButton" placeholder="Write your comment here...">코멘트 등록</button>
        </div>
        </>
        
    )
}

export default Profile;