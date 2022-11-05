import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import { Col, Card, Row } from 'antd';
import ImageSlider from '../Utils/ImageSlider';
import Button from '@mui/material/Button'
import { getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";
import '../Styles/event.css'

const Events = () => {

  const navigate = useNavigate();
  
  const handlePost =() => {
    navigate('/events/postevent');
  }
  
  const [Events, setevents] = useState([]);
  const [query, setQuery] = useState("");
  const [Events_Final, setevents_final] = useState([]);

  const { Meta } = Card;




  useEffect( () => {

    const config = {
      headers : {
         // 'Content-Type' : 'multipart/form-data',
          'x-auth-token' : getToken()
      }
  }
    axios.post('/api/events/getEvents',null,config).then (response =>{
      if (response.data.success) {

            setevents([...response.data.events])     //check if the name is called Events
            setevents_final([...response.data.events])

            console.log(response.data.events)

            
      } else{
          alert('cant fetch data from db')
      }
    })

  }, [])

  if (!Events) return null;

  const filterPost =() => {
    if (query === "") {
      setevents_final(Events);
      return;
    } 

    setevents_final(Events_Final.filter(events => {
      if (query === '') {
        return events;
      } else if (events.title.toLowerCase().includes(query.toLowerCase())) {
        return events;
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
      <h1>Welcome to Events Page!</h1>

      <Button variant="contained" size="large" color="secondary" onClick={handlePost}>Post event</Button>

      {Events.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'Left', alignItems: 'Left' }}>
          <h2>No events yet...</h2>
        </div> 
          :
                        // render card part
        <div className="eventsContnet">
          <Row gutter={[16, 16]}></Row>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <div class="example">
            <input type="text" placeholder="Enter Event Name" onChange={event => setQuery(event.target.value)} />
            <button type="submit" onClick={filterPost}><i class="fa fa-search"></i></button>
          </div>
    
        
          {
            Events_Final.map((events,index) => {
              return (
                <Col lg={6} md={8} xs={24}>
                  <a href={`/events/${events._id}`}>
                  <Card
                    hoverable={true}
                    cover={
                        <a href={`/events/${events._id}`}><ImageSlider images={events.images} /></a>
                      }
                  >
                    <Meta
                        title={events.title}
                        description={events.description}
                    />
                  </Card>
                  </a>
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
  
export default Events;
