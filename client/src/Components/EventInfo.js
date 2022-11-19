import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { useNavigate } from "react-router-dom";



function EventInfo(props) {

    const [Event, setEvent] = useState({})
    const navigate = useNavigate();

    useEffect(() => {

        setEvent(props.detail)

    }, [props.detail])

    const joinEventhandler = () => {
        props.joinEvent(props.detail._id)
    }

    const deleteEventhandler = () => {
        props.deleteEvent(props.detail._id)
    }

    const followUserhandler = () => {
        props.followUser(props.detail._id)
    }

    const backToEvents = () => {
        navigate("/events")
    }


    return (
        <div>
            <Descriptions title="Event Info">
                <Descriptions.Item label="Description"> {Event.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <div style={{ display: 'inline', justifyContent: 'center' }}>
                <div style={{padding: '10px'}} >
                    <Button size="large" shape="round" type="danger"
                        onClick={joinEventhandler}
                    >
                        Join Event
                    </Button>
                </div>
                <div style={{padding: '10px'}} >
                    <Button size="large" shape="round" type="danger"
                        onClick={backToEvents}
                    >
                        Back to Events
                    </Button>
                </div>
                <div style={{padding: '10px'}} >
                    <Button size="large" shape="round" type="danger"
                        onClick={deleteEventhandler}
                    >
                        Delete Event
                    </Button>
                </div>
                <div style={{padding: '10px'}} >
                    <Button size="large" shape="round" type="danger"
                        onClick={followUserhandler}
                    >
                        Follow this user
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EventInfo