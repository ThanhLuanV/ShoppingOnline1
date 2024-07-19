import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    const { token, customer, mycart, setToken, setCustomer, setMycart } = this.context;

    return (
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          {token === '' ? (
            <div style={linkContainerStyle}>
              <Link style={linkStyle} to='/login'>Login</Link>
              <span style={separatorStyle}>|</span>
              <Link style={linkStyle} to='/signup'>Sign-up</Link>
              <span style={separatorStyle}>|</span>
              <Link style={linkStyle} to='/active'>Active</Link>
            </div>
          ) : (
            <div style={userContainerStyle}>
              Hello <b>{customer?.name}</b>
              <span style={separatorStyle}>|</span>
              <Link style={linkStyle} to='/home' onClick={() => this.lnkLogoutClick(setToken, setCustomer, setMycart)}>Logout</Link>
              <span style={separatorStyle}>|</span>
              <Link style={linkStyle} to='/myprofile'>My Profile</Link>
              <span style={separatorStyle}>|</span>
              <Link style={linkStyle} to='/myorders'>My Orders</Link>
            </div>
          )}
        </div>
        <div style={rightSectionStyle}>
          <Link style={linkStyle} to='/mycart'>My Cart</Link> has <b>{mycart.length}</b> items
        </div>
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick = (setToken, setCustomer, setMycart) => {
    setToken('');
    setCustomer(null);
    setMycart([]);
  }
}

// Inline styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: '2px solid #f8bbd0', // Light pink border for bottom
  backgroundColor: '#fce4ec', // Light pink background
};

const leftSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const linkContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const userContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const linkStyle = {
  color: '#ec407a', // Pink color for links
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  marginRight: '10px',
  transition: 'color 0.3s',
};

const separatorStyle = {
  margin: '0 10px',
  color: '#ec407a',
};

export default Inform;

