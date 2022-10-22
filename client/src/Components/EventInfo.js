import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function EventInfo(props) {
    
    const [Event, setEvent] = useState({})

    useEffect(() => {

        setEvent(props.detail)

    }, [props.detail])

    const joinEventhandler = () => {
        props.joinEvent(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Event Info">
                <Descriptions.Item label="Description"> {Event.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={joinEventhandler}
                >
                    Join Event
                    </Button>
            </div>
        </div>
    )
}

export default EventInfo