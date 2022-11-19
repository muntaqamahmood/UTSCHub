import React from 'react'
import Button from '@mui/material/Button'
import ProfileInfo from '../Components/ProfileInfo'
import { removeUserSession,getToken, getUser } from '../Utils/Common'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../Components/Navbar/Navbar';
import '../Styles/home.css';
import { InAppNotificationDropdown } from './InAppNotificationDropdown';

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
        navigate("/events/getUserEvents");
    }

    const handleGetItems = () => {
        navigate("/postitems/getUserItems");
    }

    const handleGetOrders = () => {
        navigate("/postitems/buyItems");
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
                    <Button variant="contained" size="large" color="secondary" onClick={handleGetEvents}>My Events</Button>
                </span>
                <span>
                    <span style={{paddingRight: "220px"}}/>
                    <Button variant="contained" size="large" color="secondary" onClick={handleGetOrders}>My Orders</Button>
                </span>

                <span style={{paddingLeft:"220px"}}>
                    <Button variant="contained" size="large" color="secondary" onClick={handleGetItems}>My Items</Button>
                </span>
                <span style={{paddingLeft: "40px"}}>
                    <InAppNotificationDropdown />
                </span>
            </div>
            <div className="rightMainBox">
                <span>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogout}> Log out</Button>
                </span>
                    
                <span style={{paddingLeft:"40px"}}>
                    <Button variant="contained" size="large" color="secondary" onClick={handleDeleteAccount}> Delete Account</Button>
                </span>
            </div>
        </>
    )
}

export default Home
