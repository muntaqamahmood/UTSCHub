import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd'
import EventImage from '../Components/EventImage'
import EventInfo from '../Components/EventInfo'
import { useParams } from "react-router-dom"
import { getToken } from '../Utils/Common'
import '../Pages/eventdetail.css'

function DetailEvent() {
    
    const { eventId } = useParams();
    const [Event, setEvent] = useState([])
    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {
        Axios.get(`/api/postevent/events_by_id?id=${eventId}&type=single`, axiosConfig)
        .then(response => {
            setEvent(response.data[0])
        })
    }, [])

    return (
        <div className="postEvent" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Event.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <EventImage detail={Event}/>
                </Col>
                <Col lg={12} xs={24}>
                    <EventInfo detail={Event}/>
                </Col>
            </Row>
        </div>
    )
}

export default DetailEvent
