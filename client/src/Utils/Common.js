export const getUser =() => {
    const userStr = sessionStorage.getItem("name");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getEmail =() => {
    const emailStr = sessionStorage.getEmail("email");
    if (emailStr) return JSON.parse(emailStr);
    else return null;
}


export const getToken =() => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token) => {
    sessionStorage.setItem("token", token);
    //sessionStorage.setItem("name", JSON.stringify(user));
    //sessionStorage.setItem("email", JSON.stringify(email));
}

export const setUserData = (name,email) => {
    sessionStorage.setItem("name", JSON.stringify(name));
    sessionStorage.setItem("email", JSON.stringify(email));
}

export const removeUserSession = () =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");

}