import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import {
    getUser,
    getEmail,
    getCoverImg,
    getProfilePic,
} from '../Utils/Common'

import defaultProfilePic from'../assets/profilepic1.png'
import defaultCoverImg from '../assets/profileBackground.png'
import '../Styles/home.css';

const ProfileInfo = () => {
    
    const user = getUser();
    const email = getEmail();
    const profilePic = getProfilePic();
    const coverImg = getCoverImg();

    const profilePicFallback = useRef();
    const coverImgFallback = useRef();

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/editProfile');
    }

    const onProfilePicError = () => profilePicFallback.current.src = defaultProfilePic;
    const onCoverImgError = () => coverImgFallback.current.src = defaultCoverImg;

    return (
        <>
            <div>
                welcome back {user}<pre></pre> your email: {email}
            </div>

            <div>
                <img className="cvrImage" ref={coverImgFallback} src={coverImg} alt="cover" onError={onCoverImgError} />
            </div>

            <div className="profileBody">
                <img className="profilePic" ref={profilePicFallback} src={profilePic} alt="profile-pic" onError={onProfilePicError} />
                    <Button variant = "outlined" size="medium" color = "primary" onClick={handleEditProfile}>edit profile</Button>
            </div>
        </>
    )
}

export default ProfileInfo
