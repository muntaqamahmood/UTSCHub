import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../Utils/FileUpload'
import Axios from 'axios';
import { getUser,getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';

const { Title } = Typography;
const { TextArea } = Input;

function PostItem(props) {
    const navigate = useNavigate();
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            Images.length === 0) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer : getUser(),
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
        }

        const config = {
            headers : {
                'x-auth-token' : getToken()
            }
        }

        Axios.post('/api/postitem/uploadItem', variables, config)
            .then(response => {
                if (response.data.success) {
                    alert('Item Successfully Posted')
                    navigate("/market")

                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <><Navbar />
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2}> Post An Item</Title>
                </div>


                <Form onSubmit = {onSubmit}>

                    {/* DropZone */}
                    <FileUpload refreshFunction={updateImages}/>

                    <br />
                    <br />
                    <label>Item Title</label>
                    <Input
                        onChange={onTitleChange}
                        value={TitleValue}
                    />
                    <br />
                    <br />
                    <label>Item Description</label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={DescriptionValue}
                    />
                    <br />
                    <br />
                    <label>Price($)</label>
                    <Input
                        onChange={onPriceChange}
                        value={PriceValue}
                        type="number"
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

export default PostItem;