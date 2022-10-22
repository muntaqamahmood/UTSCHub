import React from 'react';
import Navbar from '../Components/Navbar/Navbar';

import { useNavigate } from "react-router-dom";
  
const Market = () => {

  const navigate = useNavigate();

  const handlePost = () => {
    navigate('/events/postitem');
  }

  return (
    <>
    <Navbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'Left',
        alignItems: 'Left',
        paddingLeft: "25%"
      }}
    >
      <h1>Welcome to Market Page!</h1>
      <input
        type="button"
        value={"Post Item"}
        onClick={handlePost}
      />
    </div>
    </>
  );
};
  
export default Market;