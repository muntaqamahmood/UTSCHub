import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileInfo from './Components/ProfileInfo';
import EditProfile from './Pages/EditProfile';
import Events from './Pages/Events';
import Home from './Pages/Home';
import MyEvents from './Pages/MyEvents';
import MyOrders from './Pages/MyOrders';
import MyItems from './Pages/MyItems';
import Login from './Pages/Login';
import Market from './Pages/Market';
import Message from './Pages/Messenger';
import Signup from './Pages/Signup';
import PostEvent from './Pages/PostEvent';
import DetailEvent from './Pages/DetailEvent';
import PostItem from './Pages/PostItem';
import DetailItem from './Pages/DetailItem';
import EditItem from './Pages/EditItem';
import Cart from './Pages/Cart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Login />}/>
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/editProfile" element={<EditProfile/>} />
      <Route path="/signup" exact element={<Signup />}/>
      <Route path="/profile" exact element={<ProfileInfo />}/>
      <Route path="/events/getUserEvents" exact element={<MyEvents />}/>
      <Route path="/postitems/buyItems" exact element={<MyOrders />}/>
      <Route path="/postitems/getUserItems" exact element={<MyItems />}/>
      <Route path="/market" exact element={<Market />}/>
      <Route path="/market/postitem" exact element={<PostItem />}/>
      <Route path="/market/edititem/:itemId" exact element={<EditItem />}/>
      <Route path="/market/:itemId" exact element={<DetailItem />}/>
      <Route path="/events" exact element={<Events />}/>
      <Route path="/events/postevent" exact element={<PostEvent />}/>
      <Route path="/events/:eventId" exact element={<DetailEvent />}/>
      <Route path="/message" exact element={<Message />}/>
      <Route path = "/cart" exact element = {<Cart />}/>
    </Routes>
  </BrowserRouter>
);