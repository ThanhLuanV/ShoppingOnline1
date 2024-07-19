import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';

class Main extends Component {
  render() {
    return (
      <div style={mainContainerStyle}>
        <Menu />
        <Inform />
        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/category/:cid" element={<Product />} />
            <Route path="/product/search/:keyword" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/active" element={<Active />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/mycart" element={<Mycart />} />
            <Route path="/myorders" element={<Myorders />} />
          </Routes>
        </div>
      </div>
    );
  }
}

// Inline styles
const mainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#ffeef8', // Light pink background for the whole app
};

const contentStyle = {
  flex: '1',
  padding: '20px',
  backgroundColor: '#fff', // White background for content area
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default Main;
