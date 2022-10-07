import React from 'react'
import coverIMG from '../assets/profileBackground.png'
import profilepic from'../assets/profilepic1.png'
import Button from '@mui/material/Button'
import { getEmail, getUser } from '../Utils/Common'

const ProfileInfo = () => {
    
  const user = getUser();

  const email = getEmail();

  return (
    <>

         <div>
             welcome back {user}<pre></pre> your email: {email}
        </div>
    
  
        
        <div>
        {<img src={coverIMG} width={927} height={90} alt="cover"   />}
        </div>

           
        <div style={{
            backgroundColor: "#D3D3D3",
        
            height:"134px"
        }}>
          

            {<img src={profilepic} height={120} alt="profile-pic"   />}

                <Button variant = "outlined" size="medium" color = "primary" >edit cover</Button>
        
                 <Button variant = "outlined" size="medium" color = "primary">edit profile  </Button>
           
        </div>

      
        
        



        

    </>
   
  )
}

export default ProfileInfo
