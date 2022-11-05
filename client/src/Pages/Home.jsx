import React from 'react'
import Button from '@mui/material/Button'
import ProfileInfo from '../Components/ProfileInfo'
import { removeUserSession,getToken, getUser } from '../Utils/Common'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../Components/Navbar/Navbar';
import '../Styles/home.css';

const Home = () => {

    const navigate = useNavigate();

    const handleLogout =() => {
        removeUserSession();
        navigate("/");
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': getToken(),
        }
    };

    const handleDeleteAccount = () => {

        axios.delete('http://localhost:8000/api/users', axiosConfig).then(response =>{
    
            console.log(response);
            navigate("/");
        })
    }

    const handleGetEvents = () => {
        navigate("/events/array");
    }

    const handleGetItems = () => {
        navigate("/postitems/array");
    }


    return (
        <><Navbar />
            <div className="profileBox">
                <div>
                    <ProfileInfo/>
                </div>
            </div>
            <div className="leftMainBox">
                <span>
                    <Button variant="contained" size="large" color="secondary" onClick={handleGetEvents}>My events</Button>
                </span>
                
                <span style={{paddingLeft:"20px"}}>
                    <Button variant="contained" size="large" color="secondary" onClick={handleGetItems}>My items</Button>
                </span>
            </div>
            <div className="rightMainBox">
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
