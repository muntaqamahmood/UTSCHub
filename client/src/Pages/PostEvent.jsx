import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../Utils/FileUpload'
import Axios from 'axios';
import { getUser,getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';

const { Title } = Typography;
const { TextArea } = Input;


function PostEvent(props) {
    const navigate = useNavigate();
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")


    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {

        console.log("image info ",newImages)
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || 
             !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
           // writer: props.user.userData._id,

            //not sure how to store writer? token?
            writer : getUser(),

            title: TitleValue,
            description: DescriptionValue,
      
            images: Images,
       
        }


        const config = {
            headers : {
               // 'Content-Type' : 'multipart/form-data',
                'x-auth-token' : getToken()
            }
        }

        Axios.post('/api/postevent/uploadEvent', variables,config)
            .then(response => {
                if (response.data.success) {
                    alert('Event Successfully Posted')

                    //after successful posted go back to event page
                   
                            //not sure why this cant work 
                            // props.history.push('/')
                    navigate("/events");


                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <><Navbar />
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2}> Post An Evnet</Title>
                </div>


                <Form onSubmit = {onSubmit}>

                    {/* DropZone */}
                    <FileUpload refreshFunction={updateImages}/>

                    <br />
                    <br />
                    <label>Event Title</label>
                    <Input
                        onChange={onTitleChange}
                        value={TitleValue}
                    />
                    <br />
                    <br />
                    <label>Event Description</label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={DescriptionValue}
                    />
                    <br />
                    <br />

                    <Button
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>

                </Form>

            </div>
        </>
    )
}

export default PostEvent;