import defaultProfilePic from'../assets/profilepic1.png'
import defaultCoverImg from '../assets/profileBackground.png'

export const getUser =() => {
    const userStr = sessionStorage.getItem("name");

    console.log("test");
    //console.log(JSON.parse(userStr));
    //JSON.parse(userStr);
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getEmail =() => {
    const emailStr = sessionStorage.getItem("email");
    //console.log(JSON.parse(emailStr));
    // JSON.parse(emailStr);

    if (emailStr) return JSON.parse(emailStr);
    else return null;
}

export const getCoverImg = () => {
    const coverImg = sessionStorage.getItem("coverImg");

    const imgSrc = coverImg ? JSON.parse(coverImg) : null;
    return imgSrc || defaultCoverImg;
}

export const getProfilePic = () => {
    const profilePic = sessionStorage.getItem("profilePic");

    const imgSrc = profilePic ? JSON.parse(profilePic) : null;
    return imgSrc || defaultProfilePic;
}

export const getToken =() => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token) => {
    sessionStorage.setItem("token", token);
}


export const setUserData = (name, email, profilePic, coverImg) => {
    sessionStorage.setItem("name", JSON.stringify(name));
    sessionStorage.setItem("email", JSON.stringify(email));
    sessionStorage.setItem("coverImg", JSON.stringify(coverImg ?? null));
    sessionStorage.setItem("profilePic", JSON.stringify(profilePic ?? null));
}


export const removeUserSession = () =>{
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
}

export const validatePassword = (password) => {
    const minPasswordLength = 5;
    
    const passwordProblems = [];

    if (password?.length < minPasswordLength) {
        passwordProblems.push('must be at least 5 characters long');
    }
    
    return passwordProblems;
}
