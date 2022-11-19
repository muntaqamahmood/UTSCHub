import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import  { useEffect, useState } from 'react'
import { getToken, getUserId } from '../Utils/Common'
import { Row, Col, Container, Card } from 'react-bootstrap';
import ItemImage from '../Components/Image'
import ItemInfo from '../Components/ItemInfo'
import Axios from "axios";
import ImageSlider from '../Utils/ImageSlider';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [itemsInCart, setItemsInCart] = useState([]);
    const [totalCost, setTotalCost] = useState(" [loading...] ");
    const userId = getUserId();
    const navigate = useNavigate();

    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {
        Axios.get('http://localhost:8000/api/postitem/getUserItems', axiosConfig)
        .then(response =>{
            const items = response.data.itemsInCart
            console.log(items);
            setItemsInCart(items);

            // Handle this once since React rerenders the JSX multiple times, causing too many rerenders even if setTotalCost is called once in the JSX
            let runningCost = 0;
            items.forEach((item, index) => {
                runningCost += item.price ?? 0;
            });
            setTotalCost(runningCost);
        }).catch((reason) => {
            console.error("Error getting user items on Cart page");
            console.error(reason);
            setTotalCost(0);
        });
        
    }, []);

    const placeOrder = () => {
        Axios.get('http://localhost:8000/api/postitem/buyItems', axiosConfig)
        .then(response => {
            alert("You have successfully bought the items from your cart! The sellers of the items will be notified");
            navigate(`/Dashboard/`);
            console.log(response.data);
            setItemsInCart([]);
            setTotalCost(0);
        }).catch((reason) => {
            console.error("Error buying items");
            console.error(reason);
        });
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
      <h1> Welcome to cart page !</h1>
    
      {/* <h3>Total cost: ${totalCost}</h3> */}
      {
       itemsInCart.length === 0 ?
            <h2>No items in cart...</h2>
        :
        <div className="cartPageBox">
            <Row gutter={[9, 9]}>
        {
        itemsInCart.map((item, index) => {
            return (
                
                    <Col lg={3} md={4} xs={24} key={`cart-item-${index}`}>
                        <Card>
                            <Card.Title>
                                {"Item Name: " + item.title}
                            </Card.Title>
                            { <a href={`/market/${item._id}`}><ImageSlider images={item.images} /></a> }
                            <Card.Text>
                                {"Description: " + item.description}
                                <br/>
                                {"Price: $"+item.price}
                            </Card.Text>
                        </Card>
                    </Col>  
                   
            )
        })
        }
         </Row>
        </div>

    }
    { <div>
            <h2>Total Cost: {totalCost}</h2>
            <Button size="large" shape="round" onClick={placeOrder}>Place Order</Button>
      </div>
    }


    </div>
    </>
    )
}

export default Cart
