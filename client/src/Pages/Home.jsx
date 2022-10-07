import React from 'react'
import Button from '@mui/material/Button'
import ProfileInfo from '../Components/profileInfo'
import { removeUserSession } from '../Utils/Common'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

 const handleLogout =() => {
   removeUserSession();
    navigate("/");
 }
  
  return (
    <>
  
    <div style={{paddingLeft: "300px"}}>
         <div>
            <ProfileInfo/>

            
         </div>
    
         
    </div>


    <div style={{paddingLeft: "300px",
                paddingTop:"20px"
                }}>

          <span>

          <Button variant = "contained" size="large" color = "secondary" >My events</Button>
          </span>
         
         <span style ={{paddingLeft:"20px",
                       }}>
            <Button variant = "contained" size="large" color = "secondary">My sells</Button>

         </span>
       



    </div>

    


    <div style={{paddingLeft: "1000px",
                 paddingTop:"250px"
              }}>
        <Button variant = "contained" size="large" color = "secondary" onClick={handleLogout}>Quit account</Button>
    </div>
   


    </>
  )
}

export default Home
