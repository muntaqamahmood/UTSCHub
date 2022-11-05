import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import '../Styles/eventdetail.css'

function EventImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:8000/${item}`,
                    thumbnail: `http://localhost:8000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div className="eventImage" style={{ width: '50%', height: '50%'}}>
            <ImageGallery items={Images} />
        </div>
    )
}

export default EventImage