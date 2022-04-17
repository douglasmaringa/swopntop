import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddProduct from './screens/AddProduct';
import Home from './screens/Home';
import Login from './screens/Login';
import Product from './screens/Product';
import Profile from './screens/Profile';
import Register from './screens/Register';
import SearchPage from './screens/SearchPage';
import Category from "./screens/Category"
import ProfileInventory from './screens/ProfileInventory';
import ProfileFavourite from './screens/ProfileFavourite';
import Trade from './screens/Trade';
import Connections from './screens/Connections';
import Chat from './screens/Chat';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/chat" element={<Chat/>} />
    <Route path="/connections" element={<Connections/>} />
    <Route path="/trade" element={<Trade/>} />
    <Route path="/category" element={<Category/>} />
    <Route path="/search" element={<SearchPage/>} />
    <Route path="/profilefavourite" element={<ProfileFavourite />} />
    <Route path="/profileinventory" element={<ProfileInventory />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/addproduct" element={<AddProduct />} />
    <Route path="/product" element={<Product />} />
    <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Login/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App