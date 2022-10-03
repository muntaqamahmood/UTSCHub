import React from 'react'
import Navbar from '../Components/Navbar'
import Button from '@mui/material/Button'

const Home = () => {
  return (
    <>
  
    <div style={{paddingLeft: "300px"}}>
         <div>
            <Navbar/>

            
         </div>
    
         
    </div>


    <div style={{paddingLeft: "300px",
                paddingTop:"20px"}}>
          <Button variant = "contained" size="large" color = "secondary">My events</Button>
         <Button variant = "contained" size="large" color = "secondary">My sells</Button>
    </div>


    <div style={{paddingLeft: "1000px",
                 paddingTop:"250px"
              }}>
        <Button variant = "contained" size="large" color = "secondary">Quit account</Button>
    </div>
   


    </>
  )
}

export default Home
