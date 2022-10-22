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
                <img ref={coverImgFallback} src={coverImg} width={927} height={90} alt="cover" onError={onCoverImgError} />
            </div>

            <div 
                style={{
                    backgroundColor: "#D3D3D3",
                    height:"134px",
                }}
            >
          
            <img ref={profilePicFallback} src={profilePic} height={120} alt="profile-pic" onError={onProfilePicError} />
                <Button variant = "outlined" size="medium" color = "primary" onClick={handleEditProfile}>edit profile</Button>
            </div>
        </>
    )
}

export default ProfileInfo
