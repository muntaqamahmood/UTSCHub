import React from 'react'
import coverIMG from '../assets/profileBackground.png'



const Navbar = () => {
  return (
    <>
         <div>
             welcome back !
        </div>
    
       
        <div>
            {<img src={coverIMG} width={1000} height={70} alt="cover"   />}
        </div>

        <button>edit cover</button>
        <button>edit profile</button>

    </>
   
  )
}

export default Navbar
