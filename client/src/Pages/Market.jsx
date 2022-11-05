import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import { Col, Card, Row } from 'antd';
import ImageSlider from '../Utils/ImageSlider';
import Button from '@mui/material/Button'
import { getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";
import '../Styles/event.css'

  
const Market = () => {

  const navigate = useNavigate();

  const handlePost = () => {
    navigate('/market/postitem');
  }

  const [Items, setitems] = useState([]);
  const [query, setQuery] = useState("");
  const [Items_Final, setitems_final] = useState([]);

  const { Meta } = Card;



  useEffect( () => {

    const config = {
      headers : {
         // 'Content-Type' : 'multipart/form-data',
          'x-auth-token' : getToken()
      }
  }

                // getItem api is in PostItem
    axios.post('/api/postitem/getItems',null,config).then (response =>{
      if (response.data.success) {

            setitems([...response.data.items])     //check if the name is called items
            setitems_final([...response.data.items])

            console.log(response.data.items)

            
      } else{
          alert('cant fetch data from db')
      }
    })
  }, [])



  if (!Items) return null;

  const filterPost =() => {
    if (query === "") {
      setitems_final(Items);
      return;
    } 

    setitems_final(Items_Final.filter(items => {
      if (query === '') {
        return items;
      } else if (items.title.toLowerCase().includes(query.toLowerCase())) {
        return items;
      } else {
        return null
      }
    }))
    
  }



  return (
    <>
    <Navbar />
    <div
      style={{
        display: 'block',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        paddingLeft: "300px"
      }}
    >
      <h1>Welcome to Market Page!</h1>

      <Button variant="contained" size="large" color="secondary" onClick={handlePost}>Post Items</Button>

      {Items.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'Left', alignItems: 'Left' }}>
          <h2>No items yet...</h2>
        </div> 
          :
                        // render card part
        <div>
          <Row gutter={[16, 16]}></Row>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <div class="example">
            <input type="text" placeholder="Enter Item Name" onChange={item => setQuery(item.target.value)} />
            <button type="submit" onClick={filterPost}><i class="fa fa-search"></i></button>
          </div>
          {
            Items_Final.map((items,index) => {
              return (
                <Col lg={6} md={8} xs={24}>
                  <Card
                    hoverable={true}
                    cover={
                        <a href={`/market/${items._id}`}><ImageSlider images={items.images} /></a>
                      }
                  >
                    <Meta
                        title={items.title}
                        description={items.description}
                        price={items.price}
                    />
                  </Card>
                </Col>
              )
            }) 
          }
        </div>
      }

      <br /><br />
    </div>
    </>
  );
};
  
export default Market;