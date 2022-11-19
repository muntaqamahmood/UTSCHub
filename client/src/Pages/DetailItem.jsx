import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd'
import ItemImage from '../Components/Image'
import ItemInfo from '../Components/ItemInfo'
import { useParams } from "react-router-dom"
import { getToken } from '../Utils/Common'
import Comments from "../Components/comments/Comments";
import "./Commentview.css";
import '../Styles/eventdetail.css'
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

function DetailItem() {
    
    const { itemId } = useParams();
    const [Item, setItem] = useState([])
    const [CommentList, setComments] = useState([]);
    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/api/postitem/items_by_id?id=${itemId}&type=single`, axiosConfig)
        .then(response => {
            setItem(response.data[0])
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/comments/${itemId}`, axiosConfig)
        .then((response) => {
            setComments(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const deleteItem = (itemId) => {
        const path = '/api/postitem/' + itemId;
        Axios.delete(path, axiosConfig).then(response => {
            const message = response.data.message
            console.log(message);
            navigate("/market");
        }).catch((error) => {
            const errorMsg = error.response.data.msg;
            alert(errorMsg);
            console.error(errorMsg);
            console.log(error);
        })
    }

    return (
        <div className="postItem" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Item.title}</h1>
            </div>

            <div style={{width: '100%', paddingLeft: '70%', justifyItems: 'right'}}>
                <Button size="large" shape="round" type="danger" onClick={(e) => {navigate('/market')}}>
                    Back to Market
                </Button>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ItemImage detail={Item} deleteItem={deleteItem}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ItemInfo detail={Item} deleteItem={deleteItem}/>
                </Col>
            </Row>
            <Comments
                commentsUrl="http://localhost:3004/comments"
                currentUserId={getToken()}
                currentPostId={itemId}
                comments={CommentList}
            />
        </div>
    )
}

export default DetailItem
