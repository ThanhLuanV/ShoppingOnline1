import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div style={menuContainerStyle}>
        <div style={menuListStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}><Link style={buttonStyle} to='/admin/home'>Home</Link></li>
            <li style={liStyle}><Link style={buttonStyle} to='/admin/category'>Category</Link></li>
            <li style={liStyle}><Link style={buttonStyle} to='/admin/product'>Product</Link></li>
            <li style={liStyle}><Link style={buttonStyle} to='/admin/order'>Order</Link></li>
            <li style={liStyle}><Link style={buttonStyle} to='/admin/customer'>Customer</Link></li>
          </ul>
        </div>
        <div style={logoutStyle}>
          Hello <b>{this.context.username}</b> |
          <Link style={buttonStyle} to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
        </div>
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

// Inline styles
const menuContainerStyle = {
  display: 'flex',
  flexDirection: 'column', // Change flex direction to column
  width: '250px', // Set a fixed width for the menu
  background: '#f8bbd0', // Light pink background color for the menu
  color: '#fff',
  height: '100vh', // Make the menu full height
  borderRight: '2px solid #f48fb1', // Border color for the menu
};

const menuListStyle = {
  flex: '1', // Make the list take available space
};

const ulStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
};

const liStyle = {
  margin: '8px 0', // Adjust margin for spacing
};

const buttonStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontSize: '16px', // Smaller font size
  display: 'block',
  padding: '6px 12px', // Smaller padding for smaller buttons
  margin: '3px 0', // Reduced margin for tighter spacing
  borderRadius: '4px', // Rounded corners for the button
  backgroundColor: '#f48fb1', // Light pink background color for buttons
  textAlign: 'center', // Center the text in the button
  border: 'none', // Remove default border
  transition: 'background-color 0.3s, color 0.3s',
};

// Hover effect for buttons
const buttonHoverStyle = {
  backgroundColor: '#f06292', // Darker pink color on hover
  color: '#fff',
};

const logoutStyle = {
  padding: '10px 15px',
  borderTop: '1px solid #fff', // Add a border above the logout section
  textAlign: 'center',
};

export default Menu;






