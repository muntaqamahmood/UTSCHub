import React from 'react'
import Button from '@mui/material/Button'
import ProfileInfo from '../Components/ProfileInfo'
import { removeUserSession,getToken } from '../Utils/Common'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {

    const navigate = useNavigate();

    const handleLogout =() => {
        removeUserSession();
        navigate("/");
    }

    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    const handleDeleteAccount = () => {

        axios.delete('http://localhost:8000/api/users', axiosConfig).then(response =>{
    
            console.log(response);
            navigate("/");
        })
    }


    return (
        <>
            <div style={{paddingLeft: "300px"}}>
                <div>
                    <ProfileInfo/>
                </div>
            </div>
            <div
                style={{
                    paddingLeft: "300px",
                    paddingTop:"20px",
                }}
            >
                <span>
                    <Button variant="contained" size="large" color="secondary">My events</Button>
                </span>
                
                <span style={{paddingLeft:"20px"}}>
                    <Button variant="contained" size="large" color="secondary">My items for sale</Button>
                </span>
            </div>
            <div 
                style={{
                    paddingLeft: "800px",
                    paddingTop:"250px"
                }}
            >
                <span>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogout}> Log out</Button>
                </span>
                    
                <span style={{paddingLeft:"20px"}}>
                    <Button variant="contained" size="large" color="secondary" onClick={handleDeleteAccount}> Delete Account</Button>
                </span>
            </div>
        </>
    )
}

export default Home
