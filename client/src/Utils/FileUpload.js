import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { getToken } from './Common';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data',
                'x-auth-token' : getToken()
            }
        }
        formData.append("file", files[0])
        //save the Image the user chose inside the Node Server 
        Axios.post('/api/upload/eventImage', formData, config)
            .then(response => {
                console.log("response>>>", response);
                if (response.data.success) {
                    
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

            
                {Images.map((image, index) => (
                     <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:8000/${image}`} alt={`eventImg-${index}`} />
                    </div>
                ))}


            </div>          

        </div>
    )
}

export default FileUpload
